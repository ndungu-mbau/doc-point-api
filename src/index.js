require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const handlers = require('./handlers')

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
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS,HEAD,PUT, CONNECT, TRACE")
  next();
});

app.get('/', (req, res) => res.json({ message: "Hello from Doc-Point api" }))

Object.entries(handlers).forEach(([method, value]) => {
  Object.entries(value).forEach(([path, handler]) => {
    app[method](path, handler)
  })
})

app.listen(PORT, HOST, () => console.log(`API running on port ${PORT}`))