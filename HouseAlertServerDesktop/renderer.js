document.getElementById("startButton").addEventListener('click', () => {
    window.myAPI.start()
    document.getElementById("status").textContent = "Online"
})

document.getElementById("stopButton").addEventListener('click', () => {
    window.myAPI.stop()
    document.getElementById("status").textContent = "Offline"
})