import { NextRequest, NextResponse } from 'next/server';

let windowStart = Date.now();
let requestCount = 0;

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  if (Date.now() - windowStart >= 60000) { windowStart = Date.now(); requestCount = 0; }
  if (++requestCount > 20) return NextResponse.json({ error: 'AI request limit reached' }, { status: 429 });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return NextResponse.json({ error: 'AI provider is not configured' }, { status: 503 });
  try {
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    let size = 0;
    let raw = '';
    const decoder = new TextDecoder();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 50000) {
          await reader.cancel();
          return NextResponse.json({ error: 'Request too large' }, { status: 413 });
        }
        raw += decoder.decode(value, { stream: true });
      }
      raw += decoder.decode();
    } finally { reader.releaseLock(); }
    let body;
    try { body = JSON.parse(raw); }
    catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
    if (!Array.isArray(body.contents) || body.contents.length !== 1 ||
        !Array.isArray(body.contents[0]?.parts) || body.contents[0].parts.length !== 1 ||
        typeof body.contents[0].parts[0]?.text !== 'string' || body.contents[0].parts[0].text.length > 40000) {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
    }
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      redirect: 'error',
      signal: AbortSignal.timeout(20000),
      cache: 'no-store',
      body: JSON.stringify({
        contents: [{ parts: [{ text: body.contents[0].parts[0].text }] }],
        generationConfig: { temperature: 0.3, topK: 40, topP: 0.8, maxOutputTokens: 1024 },
      }),
    });
    if (!response.ok) throw new Error('Provider error');
    const data = await response.json();
    if (data.error) throw new Error('Provider error');
    const safeCandidates = JSON.parse(JSON.stringify(data.candidates || []).split(key).join('[redacted]').split(encodeURIComponent(key)).join('[redacted]'));
    return NextResponse.json({ candidates: safeCandidates });
  } catch {
    return NextResponse.json({ error: 'AI provider request failed' }, { status: 502 });
  }
}
