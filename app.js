// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./models/db');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// app.js
const loginRouter = require('./controllers/login');
const signupRouter = require('./controllers/signup');

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
