export default async (req, res, next) => {
  res.render('pages/dashboard/index', { title: "Dashboard" })
}