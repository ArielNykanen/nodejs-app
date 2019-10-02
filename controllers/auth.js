const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = async (req, res, next) => {
  res.render('auth/login',
    {
      pageTitle: 'Login Page',
      path: '/login',
      isAuth: req.session.isLogged
    })
}

exports.getRegister = async (req, res, next) => {
  
  res.render('auth/register',
    {
      pageTitle: 'Register Page',
      path: '/register',
      isAuth: req.session.isLogged
    })
}
exports.postLogOut = async (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  })
}

exports.postLogin = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.findOne({ email: email });
  if (!user) { 
    return res.redirect('login');
  } else {
    const conPass = await bcrypt.compare(password, user.password);
    if (!conPass) {
      return res.redirect('login');
    } else {
      req.session.isLogged = true;
      req.session.user = user;
      req.session.save(err => {
        res.redirect('/')
      })
    }
  }
}



exports.postRegister = async (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let salleryPerHour = req.body.sallary;

  const userDoc = await User.findOne({ email: email })
  
  if (userDoc) {
    return res.redirect('register');
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      sallaryPerHour: salleryPerHour,
      workDays: [],
      deliveris: []
    });
    await user.save();
    res.redirect('login');
  }
}
