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

server.get('/healthcheck', function (req, res) {
  res.send({status: "ok"})
});

server.use("/api/review", createProxyMiddleware({
  changeOrigin: true,
  secure: true,
  target: process.env.REVIEW_API,
  logLevel: "info",
}));

const serverInstance = server.listen(4200, () => {
  console.log(`Server is up ...`);
});

let connections = [];

server.on("connection", (connection) => {
  connections.push(connection);
  connection.on("close", () => (connections = connections.filter((curr) => curr !== connection)));
});

const shutDown = () => {
  console.log("Shutting down...");
  serverInstance.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Could not close connections in time, Force shutting down...");
    process.exit(1);
  }, 10000);

  connections.forEach((curr) => curr.end());
  setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
};

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
