
exports.getIndexPage = async (req, res, next) => {
  res.render('home-page',
    {
      pageTitle: 'Find the cheapest online',
      path: '/',
      isAuth: req.session.isLogged
    })
}
