require('dotenv').config();
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

console.log('Testing Horror Content API...');

const testEndpoint = (path, method = 'GET') => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', reject);
    req.end();
  });
};

(async () => {
  try {
    console.log('Testing health check...');
    const health = await testEndpoint('/');
    console.log(`Health check: ${health.status} - ${health.data}`);
    console.log('API is running!');
  } catch (error) {
    console.error('Error:', error.message);
    console.log('Make sure the server is running with: npm run dev');
    process.exit(1);
  }
})();
