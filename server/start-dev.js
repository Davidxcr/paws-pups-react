const { spawn } = require('child_process');
const path = require('path');

// Start React frontend
const startFrontend = () => {
  console.log('Starting React frontend...');
  const frontend = spawn('npm', ['start'], {
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (error) => {
    console.error('Failed to start frontend:', error);
  });

  return frontend;
};

// Start Express API backend
const startBackend = () => {
  console.log('Starting Express API backend...');
  const backend = spawn('node', ['server/server.js'], {
    stdio: 'inherit',
    shell: true
  });

  backend.on('error', (error) => {
    console.error('Failed to start backend:', error);
  });

  return backend;
};

// Handle process termination
const cleanupProcesses = (processes) => {
  processes.forEach(process => {
    if (process && !process.killed) {
      process.kill();
    }
  });
};

// Start all processes
const processes = [];

try {
  processes.push(startBackend());
  processes.push(startFrontend());

  // Handle cleanup on exit
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      console.log(`\nReceived ${signal}, shutting down...`);
      cleanupProcesses(processes);
      process.exit(0);
    });
  });
} catch (error) {
  console.error('Error starting services:', error);
  cleanupProcesses(processes);
  process.exit(1);
} 