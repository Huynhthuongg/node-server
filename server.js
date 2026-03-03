const express = require("express");
const { exec } = require("child_process");

const app = express();

app.use(express.static("public"));

app.get("/api/run", (req, res) => {
  const cmd = req.query.cmd;

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
