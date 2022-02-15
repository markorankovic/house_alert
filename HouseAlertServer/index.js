const express = require('express')
const app = express()
const port = 3000

app.get('/people', (req, res) => {
    res.json(require('./mockPeople.json'))
})

app.listen(port, () => {
    console.log(`House Alert Server listening on port ${port}!`)
})