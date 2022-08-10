require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')


const PORT = process.env.PORT || 5500
app.use(router)

app.get('/', (req, res) => {
    res.send('Hello from express')
})

app.listen(PORT, () => console.log(`Listeninng on port ${PORT}`))