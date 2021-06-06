const express = require('express');
const server = express();
const path = require("path");
const {createProxyMiddleware} = require('http-proxy-middleware');
const builddirectory = path.join(__dirname, 'dist');

server.set("keepAliveTimeout", 61 * 1000);
server.set("headersTimeout", 65 * 1000);

server.use(express.static(path.join(__dirname, 'dist')));

server.get('/', function (req, res) {
  res.render(path.join(builddirectory, 'index.html'));
});

server.use("/api/review", createProxyMiddleware({
  changeOrigin: true,
  secure: true,
  target: process.env.REVIEW_API,
  logLevel: "info",
}));

server.listen(4200, () => {
  console.log(`Page served at: http://localhost:4200`);
});
