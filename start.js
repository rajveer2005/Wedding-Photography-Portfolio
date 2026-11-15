// One command to run the whole website:  node start.js
// Starts the backend (Express + MongoDB) and the frontend (Vite) together.
// Press Ctrl+C once to stop both.
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const server = path.join(root, 'server');
const client = path.join(root, 'client');
const colors = { server: '\x1b[36m', client: '\x1b[35m', start: '\x1b[32m' };
const reset = '\x1b[0m';
const say = (who, text) => console.log(`${colors[who]}[${who}]${reset} ${text}`);

// 1. Install packages the first time (skipped when node_modules already exists)
for (const dir of [server, client]) {
  if (!fs.existsSync(path.join(dir, 'node_modules'))) {
    say('start', `Installing packages in ${path.basename(dir)}/ (first run only)...`);
    const r = spawnSync('npm', ['install'], { cwd: dir, stdio: 'inherit', shell: true });
    if (r.status !== 0) { say('start', 'npm install failed. Check your internet connection and try again.'); process.exit(1); }
  }
}

// 2. Start both programs
const children = [];
let stopping = false;
function run(name, args, cwd) {
  const child = spawn(process.execPath, args, { cwd, env: process.env });
  children.push(child);
  const pipe = (stream) => stream.on('data', (d) => d.toString().split(/\r?\n/).filter(Boolean).forEach((line) => say(name, line)));
  pipe(child.stdout); pipe(child.stderr);
  child.on('exit', (code) => {
    if (stopping) return;
    say(name, `stopped (code ${code}).` + (name === 'server' ? ' Check that MongoDB is running and server/.env has a valid MONGO_URI (see server/.env.example).' : ''));
    stop(code || 1);
  });
}
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  children.forEach((c) => { try { c.kill(); } catch (e) {} });
  setTimeout(() => process.exit(code), 300);
}
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));

say('start', 'Starting One Soul Media...');
run('server', ['server.js'], server);
run('client', [path.join('node_modules', 'vite', 'bin', 'vite.js')], client);
setTimeout(() => say('start', 'Open  http://localhost:5173  (admin: http://localhost:5173/admin)'), 2500);
