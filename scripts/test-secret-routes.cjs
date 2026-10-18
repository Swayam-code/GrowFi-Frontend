const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { spawnSync } = require('node:child_process');
const env = { MARKETSTACK_API_KEY: 'test-stock-secret', GEMINI_API_KEY: 'test-gemini-secret' };
let calls = [];
let failure = false;
function loadRoute(file) {
  const output = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
    exports: output, URL, AbortSignal, TextDecoder, process: { env },
    require: () => ({ NextResponse: { json: (body, options = {}) => ({ body, status: options.status || 200 }) } }),
    fetch: async (url, options) => {
      calls.push({ url: new URL(url), options });
      return { ok: !failure, json: async () => ({ data: [{ close: 100 }], reflectedKey: env.MARKETSTACK_API_KEY, candidates: [{ content: { parts: [{ text: 'Portfolio response' }] } }] }) };
    },
  });
  return output;
}
const stocks = loadRoute('src/app/api/stocks/route.ts');
const gemini = loadRoute('src/app/api/gemini/route.ts');
const stockRequest = (symbol) => ({ nextUrl: new URL('http://localhost/api/stocks?symbol=' + encodeURIComponent(symbol)), headers: new Headers() });
const aiRequest = (body, origin = 'http://localhost') => ({ nextUrl: new URL('http://localhost/api/gemini'), headers: new Headers({ origin }), body: new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode(JSON.stringify(body))); controller.close(); } }) });
(async () => {
  let result = await stocks.GET(stockRequest('TCS'));
  assert.equal(result.status, 200);
  assert.equal(calls[0].url.origin, 'https://api.marketstack.com');
  assert.equal(calls[0].url.searchParams.get('access_key'), env.MARKETSTACK_API_KEY);
  assert.equal(calls[0].url.searchParams.get('symbols'), 'TCS.XNSE');
  assert.equal(calls[0].options.redirect, 'error');
  assert(calls[0].options.signal instanceof AbortSignal);
  assert(!JSON.stringify(result).includes(env.MARKETSTACK_API_KEY));
  const before = calls.length;
  assert.equal((await stocks.GET(stockRequest('TCS&access_key=attacker'))).status, 400);
  assert.equal(calls.length, before);
  const body = { contents: [{ parts: [{ text: 'Portfolio question' }] }] };
  assert.equal((await gemini.POST(aiRequest(body, 'https://attacker.example'))).status, 403);
  assert.equal((await gemini.POST(aiRequest({ contents: [] }))).status, 400);
  assert.equal((await gemini.POST(aiRequest({ contents: [{ parts: [{ text: 'x'.repeat(50001) }] }] }))).status, 413);
  result = await gemini.POST(aiRequest(body));
  assert.equal(result.status, 200);
  assert.equal(calls.at(-1).options.headers['x-goog-api-key'], env.GEMINI_API_KEY);
  assert.equal(calls.at(-1).options.redirect, 'error');
  assert(!JSON.stringify(result).includes(env.GEMINI_API_KEY));
  failure = true;
  assert.equal((await gemini.POST(aiRequest(body))).status, 502);
  assert.equal((await stocks.GET(stockRequest('TCS'))).status, 502);
  delete env.GEMINI_API_KEY;
  delete env.MARKETSTACK_API_KEY;
  assert.equal((await gemini.POST(aiRequest(body))).status, 503);
  assert.equal((await stocks.GET(stockRequest('TCS'))).status, 503);
  for (let i = 0; i < 35; i++) result = await stocks.GET(stockRequest('TCS'));
  assert.equal(result.status, 429);
  for (let i = 0; i < 25; i++) result = await gemini.POST(aiRequest(body));
  assert.equal(result.status, 429);
  const generated = spawnSync(process.execPath, ['fetch_fmp_stocks.js'], { encoding: 'utf8', env: { ...process.env, FMP_API_KEY: '' } });
  assert.notEqual(generated.status, 0);
  assert(generated.stderr.includes('Set FMP_API_KEY'));
  assert(!fs.readFileSync('src/context/GeminiContext.tsx', 'utf8').includes('NEXT_PUBLIC_GEMINI_API_KEY'));
  assert(!fs.readFileSync('src/services/ComparisonService.ts', 'utf8').includes('access_key'));
  console.log('PASS: fixed provider routes, input validation, origins, redirects, provider errors, missing configuration, generator fail-fast and client secret removal');
})().catch((error) => { console.error(error); process.exitCode = 1; });
