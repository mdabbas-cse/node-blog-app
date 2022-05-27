import bodyParser from "body-parser"
import MongoDBStore from "connect-mongodb-session"
import 'dotenv/config'
import express from "express"
import session from "express-session"
import mongoose from "mongoose"
import morgan from "morgan"
import { bindUserWithRequest } from "./middleware/authMiddleware.js"
import setLocals from "./middleware/setLocals.js"
import authRoutes from "./routes/auth.js"
import dashboardRoutes from "./routes/dashboard.js"

const app = express()
const port = process.env.PORT || 3000
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/blog"
const MongoBDSessionStore = MongoDBStore(session)

const store = new MongoBDSessionStore({
  uri: mongoUri,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 7,
})


// set view engine
app.set('view engine', 'ejs')
app.set('views', './views')

// middleware array 
const middleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  express.static('public'),
  morgan('dev'),
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
]


// use middleware
app.use(middleware)

// use routes
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)

// home route
app.get('/', (req, res) => {
  console.log('home page', req.session.user)
  res.render('pages/index')
})

// 404 page 
app.route('*').get((req, res) => {
  res.status(404).render('pages/404')
})

// connect to mongodb
mongoose.connect(mongoUri)
  .then(() => {
    console.log("connected to mongodb")
    // start server
    app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))
  })
  .catch(err => console.log(err))
