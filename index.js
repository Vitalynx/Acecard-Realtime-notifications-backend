var express = require('express');
var reload = require('express-reload')
const stripe = require('stripe')('sk_test_YSVzxdIsHOJ6CHFVcvLdVvzY00C1ECCNIb');
var app = express();

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
    })();
    console.log("HAVE CHARGED");
   res.send('Hello POSTtt');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

// path to reload
// important should end with "/" if index.js
var path = __dirname + '/'

app.use(reload(path))

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})