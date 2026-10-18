import { NextRequest, NextResponse } from 'next/server';

let windowStart = Date.now();
let requestCount = 0;

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get('symbol') || '';
  if (!/^[A-Za-z0-9.-]{1,24}$/.test(symbol)) {
    return NextResponse.json({ error: 'Invalid stock symbol' }, { status: 400 });
  }
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  if (Date.now() - windowStart >= 60000) { windowStart = Date.now(); requestCount = 0; }
  if (++requestCount > 30) return NextResponse.json({ error: 'Provider request limit reached' }, { status: 429 });
  const key = process.env.MARKETSTACK_API_KEY;
  if (!key) return NextResponse.json({ error: 'Stock provider is not configured' }, { status: 503 });
  const url = new URL('https://api.marketstack.com/v1/eod');
  url.searchParams.set('access_key', key);
  url.searchParams.set('symbols', `${symbol}.XNSE`);
  url.searchParams.set('limit', '1');
  try {
    const response = await fetch(url, { redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('Provider error');
    const data = await response.json();
    if (data.error) throw new Error('Provider error');
    const safeData = JSON.parse(JSON.stringify(data).split(key).join('[redacted]').split(encodeURIComponent(key)).join('[redacted]'));
    return NextResponse.json(safeData);
  } catch {
    return NextResponse.json({ error: 'Stock provider request failed' }, { status: 502 });
  }
}
