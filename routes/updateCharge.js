const express = require("express");
const router = express.Router();
const redis = require('redis')

const client = redis.createClient({host: '199.247.8.9'})

router.post("/charge/update", (req, res) => {
  console.log("Webhook called /charge/update");
  if(req.body.constructor === Object && Object.keys(req.body).includes("data")) {
    try {
      // where deposit entry in db should get updated
      let src_id = req.body.data.object.id;
      client.set(src_id, "succeeded");
      console.log("updated redis for src: ", src_id);
      res.send({ response: "success" }).status(200);
      return;
    } catch (err) {
      // console.log(err);
      console.log("failed");
    }
  } else {
    console.log("no obj")
  }

  res.send({ response: "failed" }).status(200);

});
module.exports = router;