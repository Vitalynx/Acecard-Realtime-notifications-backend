const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const stripe = require('stripe')('sk_test_YSVzxdIsHOJ6CHFVcvLdVvzY00C1ECCNIb');
const app = express();

var redis = require('redis')
var client = redis.createClient({host: '199.247.8.9'})

client.on('error', function (err) {
  console.log('Error ' + err)
})

// client.set('string key', 'string val', redis.print)
// client.hset('hash key', 'hashtest 1', 'some value', redis.print)
// client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)

// client.hkeys('hash key', function (err, replies) {
//   console.log(replies.length + ' replies:')

//   replies.forEach(function (reply, i) {
//     console.log('    ' + i + ': ' + reply)
//   })

//   client.quit()
// })


// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   body = {
       req,
       res
   }
   console.log(req.query);

    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:

    (async () => {
      const charge = await stripe.charges.create({
            amount: req.query.amount,
            currency: 'eur',
            description: 'Example charge',
            source: req.query.source,
      });
      client.set('charge', charge, redis.print)
      document.getElementById('charge').innerHTML = charge;
   })();
   res.send("success");

   //  console.log("HAVE CHARGED");
   //  console.log();
})

const server = http.createServer(app, () => {
   console.log("started");
});
const io = socketIo(server); // < Interesting!
const getApiAndEmit = "TODO"

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
   
//    console.log("Example app listening at http://%s:%s", host, port)
// })