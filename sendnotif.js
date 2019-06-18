const redis = require('redis');
const client = redis.createClient({ host: '199.247.8.9'})

// const notification = {
//     type: "notification",
//     name: "deposit",
//     amount: Math.floor(Math.random() * 350),
//     updated_balance: Math.floor(Math.random() * 350),
//     datetime: new Date()
// }

var uuid = "884e13f3-3ae1-4399-bad4-4495af7bdfda"

const getFromRedis = () => {
    client.lrange(uuid, 0, -1, (err, list) => {
    //    if (list.length !== notifications.length) {
    //       notifications = list.map(element => JSON.parse(element));
    //       io.emit("event", notifications);
    //       console.log("EMITTED EVENT");
    //       console.log(notifications[0]);
    //    }
        var notifications = list.map(element => JSON.parse(element));

        var oldbalance = notifications && notifications[0] && parseInt(notifications[0].updated_balance) - parseInt(notifications[0].amount)
        var am = Math.floor(Math.random() * 100);
        var notification = {
            type: "notification",
            name: "deposit",
            amount: oldbalance,
            updated_balance: oldbalance + am,
            datetime: new Date()
        }

        sendEvent(uuid, notification);

    })
 }

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

getFromRedis();