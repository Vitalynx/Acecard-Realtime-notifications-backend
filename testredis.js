const redis = require('redis');
const client = redis.createClient({host: 'localhost'})

const notification = {
    type: "notification",
    name: "deposit",
    amount: 150
}

var notifications = []

// client.lrange("test", 0, -1, (err, value) => {
//     // console.log(value[0])
//     value.forEach(element => {
//         var obj = JSON.parse(element);
//         // console.log(obj);
//         notifications.push(obj);
//     });
//     readNotifications();
// })

const getList = (uuid) => {
    client.lrange(uuid, 0, -1, (err, value) => {
        // console.log(value[0])
        value.forEach(element => {
            var obj = JSON.parse(element);
            // console.log(obj);
            notifications.push(obj);
        });
        readNotifications();
    })
}

const readNotifications = () => {
    notifications.forEach(notification => {
        console.log(notification);
    });
}

const sendEvent = (uuid, event) => {
    client.lpush(uuid, JSON.stringify(event), (err, value) => {
        console.log("created notification");
        // console.log(value);
        // console.log(err);
    })
}

sendEvent("ad-ef", notification);
getList("ad-ef");