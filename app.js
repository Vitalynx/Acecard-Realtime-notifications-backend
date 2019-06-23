const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const index = require("./routes/index");
const createCharge = require("./routes/createCharge");
const updateCharge = require("./routes/updateCharge");
const redis = require('redis');
var jwtDecode = require('jwt-decode');

const client = redis.createClient({host: 'localhost'})

const app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(index);
app.use(createCharge);
app.use(updateCharge);

const server = http.createServer(app);

const io = socketIo(server);

var notifications = []
var uuid;

io.use((socket, next) => {
   var handshakeData = socket.request._query;
   try {
      uuid = jwtDecode(handshakeData.jwt).sub;
      console.log("Succesfully got token and uuid: ", uuid);
      firstconnect = true;
      interval = setInterval(
         () => getFromRedis(),
         10
      );
      socket.on('disconnect', function () {
         clearInterval(interval);
      });   
      next();
   } catch (err) {
      console.log(err);
   }
})

io.on("connection", socket => {
   console.log("New client connected")

   socket.on('disconnect', function () {
        clearInterval(interval);
   });
});



const getInitialData = () => {
   client.lrange(uuid, 0, -1, (err, list) => {
         notifications = list.map(element => JSON.parse(element));
         io.emit("event", notifications);
         console.log("emitted initial data");
   });
}

const getFromRedis = () => {
   client.lrange(uuid, 0, -1, (err, list) => {
      if (list.length !== notifications.length) {
         notifications = list.map(element => JSON.parse(element));
         console.log("GOT NEW TRANSACTION FROM REDIS: ", notifications);
         io.emit("event", notifications);
         console.log("EMITTED EVENT");
      }
   })
}

server.listen(8000, () => console.log(`Listening on port 8000`));


