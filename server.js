const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const auth = require('./middleware/auth');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const session = require('express-session');
const MONGODB_URI = `mongodb://localhost:27017/test'`;

const MongoDBStore = require('connect-mongodb-session')(session);


const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // application/json
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))


const homepageRoutes = require('./routes/home-page');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static(path.join(__dirname, 'public')))


app.use(cors())
app.use(homepageRoutes);
app.use(authRoutes);
app.use(errorController.get404)

app.use(auth);




// app.use(express.static(__dirname + '/uploads/images/banners'));

const PORT = process.env.PORT || 3000;
mongoose.connect(MONGODB_URI, { useMongoClient: true })
  .then(result => {
    const server = app.listen(PORT);

    console.log("App is running on port " + PORT);

  }).catch(err => {
    console.log(err);
  })

