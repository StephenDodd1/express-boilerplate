require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const lyricsRouter = require('./lyrics/lyrics-router')
const { NODE_ENV, CLIENT_ORIGIN, DATABASE_URL } = require("./config")

const app = express()
const knex = require("knex");

app.use(cors({origin: CLIENT_ORIGIN}))

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});
console.log("knex and driver installed correctly");
app.set("db", db);

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.get('/', (req, res) => {
   res.send('Hello, world!')
})
app.use(lyricsRouter);
app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
      respone = { error: { message: 'server error'}}
   } else {
      console.error(error)
      response = {message: error.message, error }
   }
   res.status(500).json(response)
})

module.exports = app;