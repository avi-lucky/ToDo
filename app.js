const express = require('express')
const db = require('./src/db/mongoose')
const taskRouter = require('./src/routers/task')
const userRouter = require('./src/routers/user')
const path = require('path')
const http = require('http')

const app = express();

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

var jwt = require('jsonwebtoken');
const User = require('./src/models/user')

var token = jwt.sign({ _id:  '60fef303d374ae36da173c39' }, 'thisismynewproject', {
    expiresIn: '3 seconds'
  });
//   console.log(token)

jwt.verify(token, 'thisismynewproject', function(err, token) {
    // console.log(token)
  })

app.listen(3000, () => console.log("Server Up and Running!"));

module.exports = app