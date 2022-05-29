import bodyParser from "body-parser"
import flash from "connect-flash"
import MongoDBStore from "connect-mongodb-session"
import 'dotenv/config'
import express from "express"
import session from "express-session"
import { bindUserWithRequest } from "./authMiddleware.js"
import setLocals from "./setLocals.js"

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/blog"

const MongoBDSessionStore = MongoDBStore(session)
const store = new MongoBDSessionStore({
  uri: mongoUri,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 7,
})

export default (app) => {
  const middlewares = [
    express.urlencoded({ extended: true }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    express.static('public'),
    session({
      secret: process.env.SECRET_KEY || 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
      },
      store: store
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
  ]
  app.use(middlewares)
}