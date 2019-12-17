
const mongoose = require('mongoose');

function openConnection() {
    mongoose.set('useFindAndModify', false);
    mongoose.connect('mongodb://localhost/application')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.log('Could not connect to MongoDB...', err))
}

module.exports = openConnection;
