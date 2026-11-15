// Zip dist/ into release/babelbee-<version>.zip for the extension stores.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const { version } = JSON.parse(readFileSync(resolve(root, 'dist/manifest.json'), 'utf8'));
const out = resolve(root, `release/babelbee-${version}.zip`);

mkdirSync(resolve(root, 'release'), { recursive: true });
rmSync(out, { force: true });
execFileSync('zip', ['-r', '-q', out, '.'], { cwd: resolve(root, 'dist') });
console.log(`Created ${out}`);
