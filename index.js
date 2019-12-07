const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const users = require('./routes/users');
const express = require('express');
const app = express();
const events = require('./routes/events')


mongoose.connect('mongodb://localhost/social')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// app.use('/api/users', users)
app.use('/api/events', events);




const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}... `))