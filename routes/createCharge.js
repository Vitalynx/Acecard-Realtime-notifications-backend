const express = require("express");
const stripe = require('stripe')('sk_test_YSVzxdIsHOJ6CHFVcvLdVvzY00C1ECCNIb');
const router = express.Router();
router.post("/charge/create", (req, res) => {
  console.log("Webhook called /charge/create");

  createCharge(req.body, (err) => {
    if (err) {
      console.log(err);
      res.send({ response: "failed" }).status(200);      
    } else {
      res.send({ response: "success" }).status(200);
    }
  });
});

const createCharge = async (body, func) => {
  try {
    const charge = await stripe.charges.create({
      amount: body.data.object.amount,
      currency: 'eur',
      description: 'Charge nr: ' + body.data.object.id,
      source: body.data.object.id,
    });

    console.log("succesfully created charge!");

  } catch (err) {
    func(err);
  }
}


module.exports = router;