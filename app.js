const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const index = require("./routes/index");
const createCharge = require("./routes/createCharge");
const updateCharge = require("./routes/updateCharge");
const redis = require('redis')

const client = redis.createClient({host: '199.247.8.9'})

const app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(index);
// app.use(updatesource);
app.use(createCharge);
app.use(updateCharge);

const server = http.createServer(app);

const io = socketIo(server);

const getFromRedis = (socket) => {
   client.get('points', (error, value) => {
      socket.emit("points", value);
      console.log(value);
   });
}

io.on("connection", socket => {
   console.log("New client connected"), setInterval(
     () => getFromRedis(socket),
     100
   );
   socket.on("disconnect", () => console.log("Client disconnected"));
});

// const getApiAndEmit = async socket => {
//    try {
//      const res = await axios.get(
//        "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
//      ); // Getting the data from DarkSky
//      socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
//    } catch (error) {
//      console.error(`Error: ${error.code}`);
//    }
//  };


// const pushAPIData = async () => {

// }



server.listen(8000, () => console.log(`Listening on port 8000`));
