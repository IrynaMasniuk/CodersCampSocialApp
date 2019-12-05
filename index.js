const logger = require('./middleware/logger');
const users = require('./routes/users');
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true})); 
app.use('/api/users', users) 

const PORT = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}... `))