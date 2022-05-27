import Flash from "../utils/Flash.js"

export default async (req, res, next) => {
  res.render('pages/dashboard/index',
    {
      title: "Dashboard",
      flashMessage: Flash.getMessage(req),
    }
  )
}