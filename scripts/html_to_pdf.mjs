#!/usr/bin/env node
// Renderiza HTML -> PDF com o Google Chrome instalado (headless), sem dependencias externas.
// Uso:
//   node scripts/html_to_pdf.mjs entrada.html saida.pdf
//   node scripts/html_to_pdf.mjs                 -> renderiza todo tailor_responses/*.html
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, existsSync, statSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser',
];
function findChrome() {
  for (const c of CHROME_CANDIDATES) {
    if (c.startsWith('/')) { if (existsSync(c)) return c; }
    else if (spawnSync('command', ['-v', c], { shell: true }).status === 0) return c;
  }
  throw new Error('Chrome/Chromium nao encontrado.');
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function render(chrome, htmlPath, pdfPath) {
  const abs = htmlPath.startsWith('/') ? htmlPath : join(process.cwd(), htmlPath);
  if (!existsSync(abs)) throw new Error(`HTML nao encontrado: ${abs}`);
  const profile = mkdtempSync(join(tmpdir(), 'cv-pdf-'));
  if (existsSync(pdfPath)) rmSync(pdfPath);
  const child = spawn(chrome, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
    `--user-data-dir=${profile}`, '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`, 'file://' + abs,
  ], { stdio: 'ignore' });

  // Chrome com perfil isolado gera o PDF mas nao encerra sozinho: detectar e matar.
  let last = -1, stable = 0;
  for (let i = 0; i < 100; i++) {           // ate ~20s
    await sleep(200);
    if (existsSync(pdfPath)) {
      const sz = statSync(pdfPath).size;
      if (sz > 0 && sz === last) { if (++stable >= 2) break; } else stable = 0;
      last = sz;
    }
  }
  try { child.kill('SIGKILL'); } catch {}
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  if (!existsSync(pdfPath) || statSync(pdfPath).size === 0)
    throw new Error(`Falha ao gerar ${pdfPath}`);
  console.log(`ok  ${htmlPath} -> ${pdfPath} (${statSync(pdfPath).size} bytes)`);
}

const chrome = findChrome();
const [,, inHtml, outPdf] = process.argv;
if (inHtml && outPdf) {
  await render(chrome, inHtml, outPdf);
} else {
  const dir = 'tailor_responses';
  const htmls = existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith('.html')) : [];
  if (!htmls.length) { console.error('Nenhum .html em tailor_responses/'); process.exit(1); }
  for (const h of htmls) await render(chrome, join(dir, h), join(dir, h.replace(/\.html$/, '.pdf')));
}
