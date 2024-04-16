function savescript() {
  let savedscript = document.getElementById("script").value
  localStorage.setItem("savedscript", `${savedscript}`);
}

function loadscript() {
  document.getElementById("script").value = localStorage.getItem("savedscript");
}

function clearscript() {
  document.getElementById("script").value = ""
}
const socket = new WebSocket('wss://editor.unithub.xyz/test');
// Create WebSocket connection.
// Connection opened
socket.addEventListener('open', function(event) {
  console.log('Connected to WS Server')
  document.getElementById("status").innerHTML = `Connected ✅`;
});

// Listen for messages
socket.addEventListener('message', function(event) {
  console.log('Message from server:', event.data);
});

socket.addEventListener('close', function(event) {
  document.getElementById("status").innerHTML = `Disconnected, please refresh ❌`;
});

const execute = () => {
  socket.send(document.getElementById("script").value);
}

function changetheme(themeName) {
  let savedscript = document.getElementById("script").value
  localStorage.setItem("theme", `${themeName}`);
  location.reload();
}

if (localStorage.getItem("lastsaved")) {
  document.getElementById("script").value = localStorage.getItem("lastsaved");
} else {
  document.getElementById("script").value = document.getElementById("script").value
}

function autosave() {
  setInterval(function() {
    localStorage.setItem("lastsaved", `${document.getElementById("script").value}`);
  }, 100);
}

autosave()