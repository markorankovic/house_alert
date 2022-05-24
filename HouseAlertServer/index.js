const getMessaging = require('firebase-admin/messaging').getMessaging

const admin = require('firebase-admin')
const initializeApp = require('firebase-admin/app').initializeApp

const axios = require('axios').default

var serviceAccount = require("./house-alert-notifications-firebase-adminsdk-zohit-bc151baa75.json");

const firebaseApp = initializeApp({
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
            notification: {
                title: "House Alert",
                body: `You received an alert from ${from}!`
            },
            token: client.data.deviceToken
        }

        getMessaging().send(message)
        .then(response => console.log("Response: ", response))
        .catch(error => console.log("Error: ", error))
    } catch (error) {
        console.log('Error: ' + error)
    }

}

function register(payload, ws) {
    clients[payload.data.id] = { socket: ws, data: payload.data }
    console.log('clients[payload.data.id]: ', clients[payload.data.id])
}

var clients = {}

wss.on('connection', function(ws) {

    console.log('New client connected')

    ws.send(JSON.stringify({type: 'people', data: { people: users }}))

    ws.on('message', message => {
        const payload = JSON.parse(message)
        switch (payload.type) {
            case 'notification': notify(payload); return
            case 'register': register(payload, ws)
        }
    })

    ws.on('close', () => {
        console.log('Client has disconnected')
    })
})

const express = require('express');
const app = express()
const port = 3000

app.get('/avatar/:name', (req, res) => {
    const name = req.params['name']
    res.sendFile('./simpsons/' + name, { root: __dirname })
})

app.listen(port, () => {})