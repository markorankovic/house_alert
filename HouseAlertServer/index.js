const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8082 })

var users = require('./mockPeople.json').people

wss.on('connection', ws => {
    console.log('New client connected')

    console.log(users)

    ws.send(JSON.stringify(users))

    ws.on('message', message =>
        console.log("Hey client, how are you?")
    )

    ws.on('close', () => {
        console.log('Client has disconnected')
    })
})