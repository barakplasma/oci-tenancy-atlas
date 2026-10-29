// Builds dist/index.html: the page with the vendored ondine script inlined, so it is one file to host.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const tag = '<script src="vendor/ondine-0.0.3.js"></script>';
const html = readFileSync('index.html', 'utf8');
if (!html.includes(tag)) throw new Error(`index.html no longer references ${tag}`);

// "</script" inside the inlined code would end the tag early
const ondine = readFileSync('vendor/ondine-0.0.3.js', 'utf8').replace(/<\/script/gi, '<\\/script');
const out = html.replace(tag, () => `<script>\n${ondine}\n</script>`);

// every inline script must still parse
const scripts = [...out.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (scripts.length < 2) throw new Error(`expected the page script and ondine inline, found ${scripts.length}`);
scripts.forEach(s => new Function(s));

mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', out);
console.log(`dist/index.html: ${(out.length / 1024).toFixed(0)} KB, ${scripts.length} inline scripts`);
