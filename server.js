const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "terminal.html"));
});

app.get("/run", (req, res) => {
  const cmd = req.query.cmd;

  if (!cmd) {
    return res.send("");
  }

  exec(cmd, (err, stdout, stderr) => {
    if (err) return res.send(err.message);
    if (stderr) return res.send(stderr);
    res.send(stdout);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
