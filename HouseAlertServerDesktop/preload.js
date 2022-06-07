const { contextBridge } = require('electron')
const { startServer, stopServer } = require('./server')

function start() {
  console.log("Starting server...")
  startServer()
}

function stop() {
  console.log("Stopping server...")
  stopServer()
}

contextBridge.exposeInMainWorld('myAPI', {
  start: start,
  stop: stop
})