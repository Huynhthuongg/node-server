const socket = io();

const term = new Terminal({
  cursorBlink: true
});

term.open(document.getElementById("terminal"));

socket.on("output", (data) => {
  term.write(data);
});

term.onData((data) => {
  socket.emit("input", data);
});
