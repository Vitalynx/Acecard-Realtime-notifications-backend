const redis = require('redis');
const client = redis.createClient({host: 'localhost'})

const notification = {
    type: "notification",
    name: "deposit",
    amount: Math.floor(Math.random() * 350),
    date: new Date()
}

var uuid = "884e13f3-3ae1-4399-bad4-4495af7bdfda"

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const sendEvent = (uuid, event) => {
    client.lpush(uuid, JSON.stringify(event), (err, value) => {
        console.log("created notification");
        process.exit(0)
        // console.log(value);
        // console.log(err);
    })
}

sendEvent(uuid, notification);