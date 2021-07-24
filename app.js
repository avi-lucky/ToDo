const express = require('express')
const db = require('./src/db/mongoose')
const taskRouter = require('./src/routers/task')
const path = require('path')
const http = require('http')

const app = express();

app.use(express.json())
app.use(taskRouter)

app.listen(3000, () => console.log("Server Up and running"));

module.exports = app