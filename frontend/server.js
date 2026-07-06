#!/usr/bin/env node
// Start Vite dev server
const { spawn } = require('child_process');
const path = require('path');

const viteModulePath = path.join(__dirname, 'node_modules', '.bin', 'vite');

console.log('Starting Vite development server...');
console.log('Open browser at: http://localhost:5173');

const viteProcess = spawn('node', [
  require.resolve('vite/bin/vite.js')
], {
  cwd: __dirname,
  stdio: 'inherit'
});

viteProcess.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  process.exit(1);
});
