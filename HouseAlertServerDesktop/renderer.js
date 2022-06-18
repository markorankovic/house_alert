document.getElementById("startButton").addEventListener('click', () => {
    const port = window.myAPI.start().port
    const ip = window.myAPI.ip()
    document.getElementById("status").textContent = "Online at: " + ip + ":" + port
})

document.getElementById("stopButton").addEventListener('click', () => {
    window.myAPI.stop()
    document.getElementById("status").textContent = "Offline"
})