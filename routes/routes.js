import Flash from "../utils/Flash.js"
import authRoutes from "./auth.js"
import dashboardRoutes from "./dashboard.js"
import upload from './upload.js'


export default (app) => {
  app.use('/dashboard', dashboardRoutes)
  app.use('/auth', authRoutes)
  app.get('/', (req, res) => {
    res.render('pages/index',
      {
        title: 'Home',
        flashMessage: Flash.getMessage(req),
      }
    )
  })
  app.use('/upload', upload)

  // app.route('*').get((req, res) => {
  //   res.status(404).render('pages/error/404',
  //     {
  //       title: '404',
  //       flashMessage: Flash.getMessage(req),
  //     }
  //   )
  // })

  // 404 
  app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).render('pages/error/404',
        {
          title: '404',
          flashMessage: Flash.getMessage(req),
        }
      )
    }
    res.status(500).render('pages/error/500',
      {
        title: '500',
        flashMessage: Flash.getMessage(req),
      }
    )
  })

}