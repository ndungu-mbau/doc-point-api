require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const { PORT, DB_URI, HOST = '127.0.0.1' } = process.env

mongoose.Promise = global.Promise
mongoose.connect(DB_URI,{
  useNewUrlParser: true
})
.then(()=> console.log(`Connected successfully on ${DB_URI}`))
.catch(err => console.log(`Failed! ${err}`))

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, _, next) => {
  req.db = mongoose.connection
  next()
})

app.get('/', (req, res) => res.json({ message: "Hello from Doc-Point api" }))
app.get('/doctors', async (req, res) => {
  res.json({ message: "Doctor's endpoint" })
})

app.listen(PORT, HOST, () => console.log(`API running on port ${PORT}`))