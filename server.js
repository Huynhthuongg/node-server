const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const pty = require("node-pty");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/terminal.html"));
});

wss.on("connection", (ws) => {
  const shell = "bash";

  const ptyProcess = pty.spawn(shell, [], {
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  ptyProcess.onData(data => ws.send(data));
  ws.on("message", msg => ptyProcess.write(msg));
});

server.listen(process.env.PORT || 3000);
