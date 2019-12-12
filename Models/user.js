const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/application')
    .then(() => console.log('Connected to MongoDB...')) //Change
    .catch(err => console.log('Could not connect to MongoDB...', err)) //to debugger module

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        // match: //pattern
    },
    dateOfBirth: {
        type: String, // change to Date
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    work: String,
    education: String,
    cityOfLiving: String,
    cityOfOrigin: String,
    relationStatus: {
        type: String,
        required: true,
        enum: ['single', 'dating', 'married', 'divorced', 'complicated']
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    hobbies: {
        type: String,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A user should have at least one hobby :)'
        }
    },
    //isOnline: Boolean,
});

const User = mongoose.model('User', userSchema);

async function createUser(userData) {
    let user = new User({
        username: userData.username,
        dateOfBirth: userData.dateOfBirth,
        phoneNumber: userData.phoneNumber,
        work: userData.work,
        education: userData.education,
        cityOfLiving: userData.cityOfLiving,
        cityOfOrigin: userData.cityOfOrigin,
        relationStatus: userData.relationStatus,
        email: userData.email,
        hobbies: userData.hobbies
    });

    try {
        const result = await user.save();
        console.log(result);
        return result;
    } catch (ex) {
        console.log(ex.message);
        return undefined;
    }
}

async function searchUser(email) {
    const temp = await User.findOne({
        "email": email
    });
    console.log('foundUser:' + JSON.stringify(temp));
    return temp;
}

exports.createUser = createUser;
exports.searchUser = searchUser;