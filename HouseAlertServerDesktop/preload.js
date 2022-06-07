const { contextBridge } = require('electron')
const { startServer } = require('./server')

function start() {
  console.log("Starting server...")
  startServer()
}

contextBridge.exposeInMainWorld('myAPI', {
  start: start
})