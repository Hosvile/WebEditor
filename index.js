//defining main variables
const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const helmet = require('helmet');
const server = require('http').createServer(app);
const port = 3000
const WebSocket = require('ws')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
app.use(express.static(__dirname + '/public'));
//cors
const cors = require('cors');
app.use(cors());
app.options('*', cors())
app.disable('x-powered-by');
//functions
function Themes() {
  let arr = fs.readdirSync('./public/ace').toString();
  let ok = arr.match(/theme-[\w]{1,30}/gi);
  ok = ok.toString().replace(/theme-/gi, "")
  return ok.split(",");
}
//websocket
const wss = new WebSocket.Server({ server: server, path: "/test" });

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

  });
});
//directories
app.get('/', (req, res) => {
  console.log(req.headers['x-forwarded-for']);
  res.render('pages/index', {
    theme: Themes()
  })
});

app.get('/themes', (req, res) => {
  res.render('pages/themes', {
    theme: Themes()
  })
});

app.get('/execute', (req, res) => {
  let script = req.body['script']
  res.send(script)
});



//404
app.get('*', (_, res) => {
  res.redirect('/')
});


//port
server.listen(port)
console.log(`running in port ${port}`);
