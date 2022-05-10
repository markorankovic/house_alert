var admin = require("firebase-admin");
var firebase = require('firebase-admin/messaging')

var serviceAccount = require("./house-alert-notifications-firebase-adminsdk-zohit-bc151baa75.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'house-alert-notifications'
});


const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 6000 })

var users = require('./simpsons/mockPeople.json').people

function getUserName(id) {
    return users.find(user => user.id == id).name
}

function notify(payload) {
    try {
        const from = getUserName(payload.data.from)
        const to = getUserName(payload.data.to)
        console.log(from + " notifies " + to)
        const client = clients[payload.data.to]
        
        const message = {
        data: {
            score: '850',
            time: '2:45'
        },
        token: "7d7c6264e8e85d07283b3fe14a908e5b0ae877b177b12c816c7a7f53ae9abc97"
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        console.log("firebase.getMessaging", firebase.getMessaging)
        firebase.getMessaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
        } catch (error) {
            console.log('Error: ' + error)
        }
}

function register(payload, ws) {
    clients[payload.data.id] = ws
}

var clients = {}

wss.on('connection', function(ws) {

    console.log('New client connected')

    ws.send(JSON.stringify({type: 'people', data: { people: users }}))

    ws.on('message', message => {
        const payload = JSON.parse(message)
        switch (payload.type) {
            case 'notification': notify(payload)
            case 'register': register(payload, ws)
        }
    })

    ws.on('close', () => {
        console.log('Client has disconnected')
    })
})

const express = require('express')
const app = express()
const port = 3000

app.get('/avatar/:name', (req, res) => {
    const name = req.params['name']
    res.sendFile('./simpsons/' + name, { root: __dirname })
})

app.listen(port, () => {})