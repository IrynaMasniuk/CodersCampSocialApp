const Joi = require('joi');
const comments = require('./routes/comments');
const events = require('./routes/events');
const friends = require('./routes/friends');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/friends', friends);
app.use('/api/events', events);
app.use('/api/comments', comments);              


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}... `))