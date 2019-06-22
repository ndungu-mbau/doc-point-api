const express = require('express')

const app = express()
const { PORT } = process.env

app.get('/', (req, res) => res.json({ message: "Hello from Doc-Point api" }))

app.listen(PORT, () => console.log(`API running on port ${PORT}`))