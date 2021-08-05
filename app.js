const express = require('express')
const db = require('./src/db/mongoose')
const taskRouter = require('./src/routers/task')
const userRouter = require('./src/routers/user')
const path = require('path')
const http = require('http')

const app = express();

const publicDirectoryPath = path.join(__dirname, '/public/')

app.get('/', function (req, res, next) {
  // console.log(publicDirectoryPath)
  res.render(`${publicDirectoryPath}signin.ejs`)
  // console.log('Successfully User Created!')
})

app.get('/task', function (req, res, next) {
  res.render(`${publicDirectoryPath}task.ejs`)
})

app.get('/forgot', function (req, res, next) {
  res.render(`${publicDirectoryPath}forgot.ejs`)
})

app.get('/signup', function (req, res, next) {
  res.render(`${publicDirectoryPath}signup.ejs`)
})

app.use(express.static(publicDirectoryPath))


app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


var jwt = require('jsonwebtoken');
const User = require('./src/routers/user')

var token = jwt.sign({ _id:  '60fef303d374ae36da173c39' }, 'thisismynewproject', {
    expiresIn: '3 seconds'
  });
//   console.log(token)

jwt.verify(token, 'thisismynewproject', function(err, token) {
    // console.log(token)
  })

app.listen(3000, () => console.log("Server Up and Running!"));

module.exports = app