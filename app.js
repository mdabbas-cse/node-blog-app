import 'dotenv/config'
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import registerMiddleWare from "./middleware/middlewares.js"
import registerRoute from "./routes/routes.js"

const app = express()
const port = process.env.PORT || 3000
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/blog"

if (app.get('env') === 'development') {
  app.use(morgan('dev'))
}

// set view engine
app.set('view engine', 'ejs')
app.set('views', './views')

// use middleware
registerMiddleWare(app)

// use routes
registerRoute(app)

// connect to mongodb
mongoose.connect(mongoUri)
  .then(() => {
    console.log("connected to mongodb")
    // start server
    app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))
  })
  .catch(err => console.log(err))
