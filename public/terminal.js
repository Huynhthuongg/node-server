const input = document.getElementById("cmd");
const output = document.getElementById("output");

function print(text) {
  output.innerHTML += text + "\n";
  window.scrollTo(0, document.body.scrollHeight);
}

print("LED Terminal Ready");
print("Type help");

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    print("root@server:~$ " + cmd);

    if (cmd === "help") {
      print("commands:");
      print("status");
      print("clear");
      print("about");
    }

    else if (cmd === "status") {
      print("Server running...");
    }

    else if (cmd === "about") {
      print("AI Node System v1");
    }

    else if (cmd === "clear") {
      output.innerHTML = "";
    }

    else {
      print("command not found");
    }

    input.value = "";
  }
});
