import Flash from "../utils/Flash.js"
import authRoutes from "./auth.js"
import dashboardRoutes from "./dashboard.js"


export default function (app) {
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

  app.route('*').get((req, res) => {
    res.status(404).render('pages/404',
      {
        title: '404',
        flashMessage: Flash.getMessage(req),
      }
    )
  })
}