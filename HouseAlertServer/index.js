const jsonwebtoken = require('jsonwebtoken')
var admin = require("firebase-admin");
var firebase = require('firebase-admin/messaging')
const axios = require('axios').default

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
        
        // console.log("firebase.getMessaging", firebase.getMessaging)
        // firebase.getMessaging().send(message)
        // .then((response) => {
        //     console.log('Successfully sent message:', response);
        // })
        // .catch((error) => {
        //     console.log('Error sending message:', error);
        // });

        function readKey() {
            const fs = require('fs')
            const path = "./AuthKey_DRQD722R26.p8"
            return fs.readFileSync(path).toString()
        }

        async function apns() {
            const URL = 'http://api.sandbox.push.apple.com:443'
            const deviceToken = payload.data.deviceToken
            console.log("Device token: ", deviceToken)
            const authSignToken = readKey()
            console.log("authSignToken: ", authSignToken)
            const _payload = {
                iss: '83XX9TWPTZ'
            }
            const signOptions = {
                keyid: 'DRQD722R26',
                algorithm: 'ES256'
            }
            const jwt = jsonwebtoken.sign(_payload, authSignToken, signOptions)
            console.log("JWT: ", jwt)

            const path = '/3/device/' + deviceToken
            const authorization = 'Bearer ' + jwt

            axios({
                url: URL,
                method: 'post',
                headers: {
                    'scheme': 'https',
                    'path': path,
                    'authorization': authorization,
                    'apns-push-type': 'alert'
                },
                data: {
                    aps: {
                        alert: 'hello'
                    }
                }
            }).catch(error => console.log('Axios error: ', error))
        }

        apns()
        .catch(error => console.log("JWT error: ", error))
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

const express = require('express');
const app = express()
const port = 3000

app.get('/avatar/:name', (req, res) => {
    const name = req.params['name']
    res.sendFile('./simpsons/' + name, { root: __dirname })
})

app.listen(port, () => {})