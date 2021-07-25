const dotenv = require("dotenv")
dotenv.config()

process.env = Object.assign(process.env, {
    DB_CONNECT: 'mongodb+srv://Lucky:Avikal1999@cluster0.mjffa.mongodb.net/ToDoApp_test'
  });

module.exports = process.env