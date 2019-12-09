const Joi = require('joi');
const logger = require('./middleware/logger');
const users = require('./routes/users');
const friends = require('./routes/friends');
const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
// const express = require('./database');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true})); 
app.use('/api/users', users);
app.use('/api.users/:id/friends',friends);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'sesja-logowania',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}... `))