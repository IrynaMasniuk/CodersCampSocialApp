const Joi = require('joi');
const logger = require('./middleware/logger');
const users = require('./routes/users');
const friends = require('./routes/friends');
const express = require('express');
const comments = require('./routes/comments');
// const express = require('./database');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true})); 
app.use('/api/users', users);
app.use('/api.users/:id/friends',friends) ;
app.use('/?', comments);              //Nie wiem gdzie będą komentarze...

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}... `))