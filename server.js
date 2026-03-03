const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const pty = require("node-pty");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, "public")));

wss.on("connection", (ws) => {
  const shell = process.env.SHELL || "bash";

  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  ptyProcess.onData((data) => {
    ws.send(data);
  });

  ws.on("message", (msg) => {
    ptyProcess.write(msg);
  });

  ws.on("close", () => {
    ptyProcess.kill();
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Terminal server running on port " + PORT);
});
