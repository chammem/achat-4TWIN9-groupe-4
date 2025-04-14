// angular-metrics-server/metrics-server.js
const http = require('http');
const PORT = 9091;

let requestCount = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/metrics') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`# HELP angular_requests_total Total HTTP requests\n# TYPE angular_requests_total counter\nangular_requests_total ${requestCount}\n`);
  } else if (req.url === '/track') {
    requestCount++;
    res.writeHead(200);
    res.end('Metric received');
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[METRICS] Server running on http://0.0.0.0:${PORT}`);
});
