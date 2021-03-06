const Joi = require('joi');
const cors = require('cors');
const comments = require('./routes/comments');
const events = require('./routes/events');
const friends = require('./routes/friends');
const posts = require('./routes/posts');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const express = require('express');
// const events = require('./routes/events')
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', users);
app.use('/api/friends', friends);
app.use('/api/events', events);
app.use('/api/comments', comments);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}... `))