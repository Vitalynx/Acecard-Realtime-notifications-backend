// This file is for testing Redis

const redis = require('redis');
const client = redis.createClient({host: 'localhost'})

const notification = {
    type: "notification",
    name: "deposit",
    amount: 150
}

var notifications = []

const getList = (uuid) => {
    client.lrange(uuid, 0, -1, (err, value) => {
        value.forEach(element => {
            var obj = JSON.parse(element);
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
    })
}

sendEvent("ad-ef", notification);
getList("ad-ef");