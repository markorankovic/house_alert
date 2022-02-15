const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8082 })

wss.on('connection', ws => {
    var users = require('./mockPeople.json').people

    console.log('New client connected')

    ws.send(JSON.stringify(users))

    ws.on('close', () => {
        console.log('Client has disconnected')
    })
})