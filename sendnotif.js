const redis = require('redis');
const client = redis.createClient({ host: '199.247.8.9'})

const notification = {
    type: "notification",
    name: "deposit",
    amount: Math.floor(Math.random() * 350),
    updated_balance: Math.floor(Math.random() * 350),
    datetime: new Date().toISOString()
}

var uuid = "884e13f3-3ae1-4399-bad4-4495af7bdfda"

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


const sendEvent = (uuid, event) => {
    console.log(JSON.stringify(event))
    client.lpush(uuid, JSON.stringify(event), (err, value) => {
        console.log("created notification");
        console.log(err);
        console.log(value);
        process.exit(0)
        // console.log(value);
        // console.log(err);
    })
}

const updateFromLastNotification = (substract, amount) => {
    client.lrange(uuid, 0, 1, (err, list) => {
        console.log(list);
        if(list.length) {
            console.log("LIST IS NOT EMPTY");
            var data = list.map(element => JSON.parse(element))[0];
            var amountToAdd = amount ? amount : Math.floor(1 + Math.random() * 10);
            notification.amount = amountToAdd;
            notification.updated_balance = substract ? data.updated_balance - amountToAdd : data.updated_balance + amountToAdd;
        }
        sendEvent(uuid, notification);
    })
}


updateFromLastNotification(false);

// lastNotification = getFromRedis();
// console.log("last:", lastNotification);
// getFromRedis();
    // sendEvent(uuid, notification);

