const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 5000 })

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
        client.send(JSON.stringify({type: 'notification', data: { from: from }}))    
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