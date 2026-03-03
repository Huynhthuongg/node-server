const express = require("express");
const http = require("http");
const os = require("os");
const pty = require("node-pty");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

  const shell = os.platform() === "win32" ? "cmd.exe" : "bash";

  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env
  });

  ptyProcess.onData((data) => {
    socket.emit("output", data);
  });

  socket.on("input", (data) => {
    ptyProcess.write(data);
  });

  socket.on("disconnect", () => {
    ptyProcess.kill();
  });

});

server.listen(3000, () => {
  console.log("Terminal server running");
});
