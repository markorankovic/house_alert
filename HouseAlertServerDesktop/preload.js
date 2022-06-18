const { contextBridge } = require('electron')
const { startServer, stopServer, getIP } = require('./server')

function start() {
  console.log("Starting server...")
  return startServer()
}

function stop() {
  console.log("Stopping server...")
  stopServer()
}

function ip() {
  return getIP()
}

contextBridge.exposeInMainWorld('myAPI', {
  start: start,
  stop: stop,
  ip: ip
})