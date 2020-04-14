const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const http = require("http");
const morgan = require("morgan");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();

//create a server object:
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Circle-Server");
});

const io = socketIo(server); // < Interesting!

io.on("connection", socket => {
  console.log("New client joined: ", socket.id);
  // join room
  socket.join("sensor_room");

  // report on disconnect
  socket.on("disconnect", () => console.log("Client disconnected"));

  socket.on('motion_data', data => {
    console.log(data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
