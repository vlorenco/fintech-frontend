const fs = require('fs').promises;
const path = require('path');

const root = path.resolve(__dirname, '..');
const includeDirs = ['src', 'public'];
const exts = ['.ts', '.tsx', '.js', '.jsx', '.css', '.html'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      files.push(...await walk(full));
    } else if (exts.includes(path.extname(e.name))) {
      files.push(full);
    }
  }
  return files;
}

function stripComments(content, ext) {
  let out = content;
  if (ext === '.css') {
    // remove /* ... */
    out = out.replace(/\/\*[\s\S]*?\*\//g, '');
  } else if (ext === '.html') {
    // remove <!-- ... -->
    out = out.replace(/<!--([\s\S]*?)-->/g, '');
  } else {
    // handle JS/TS/TSX/JSX
    // remove JSX comments {/* ... */}
    out = out.replace(/\{\/\*[\s\S]*?\*\/(?:\s*)\}/g, '');
    // remove block comments /* ... */
    out = out.replace(/\/\*[\s\S]*?\*\//g, '');
    // remove line comments that start the line or are preceded only by whitespace
    out = out.replace(/^[ \t]*\/\/.*$/gm, '');
  }

  // remove any accidental multiple blank lines
  out = out.replace(/\n{3,}/g, '\n\n');

  return out;
}

(async () => {
  try {
    for (const d of includeDirs) {
      const dir = path.join(root, d);
      try {
        await fs.access(dir);
      } catch (err) {
        continue;
      }
      const files = await walk(dir);
      for (const f of files) {
        const ext = path.extname(f);
        const content = await fs.readFile(f, 'utf8');
        const stripped = stripComments(content, ext);
        if (stripped !== content) {
          await fs.writeFile(f, stripped, 'utf8');
          console.log('Stripped comments:', path.relative(root, f));
        }
      }
    }
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
