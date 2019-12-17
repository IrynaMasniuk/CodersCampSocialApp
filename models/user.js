const mongoose = require('mongoose');
const openDbConnection = require('../middleware/db');
openDbConnection();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,

    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 24
    },
    dateOfBirth: {
        type: String,              
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
    listOfFriends:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
        }],
});

const User = mongoose.model('User', userSchema);

async function insertUser(userData) {
    let user = new User({
        username: userData.username,
        password: userData.password,
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

    exports.createUser = createUser;
    exports.searchUser = searchUser;

async function createUser(userData) {
    const existingUser = await checkIfUserExistsByEmail(userData.email);
  
    if (existingUser) {
        return {
            message: 'User with such e-mail is already registered',
            status: 'failed',
            newUserId: null
        }
    } else {
        const newUser = await insertUser(userData);
        if (newUser) {
            return {
                message: null,
                status: 'ok',
                newUserId: newUser._id
            }
        }
    
        else
            return {
                message: 'User with such e-mail is already registered',
                status: 'failed',
                newUserId: null
            };
    }
}
async function editPassword(email, new_password){
    let user = searchUser(email);
    if(user != null) {
        user.password = new_password;
        await user.save();
    }else{
        prompt('User witch such email doesn;t exists');
    }
}
async function reset_password(email, password){
    // ta funkcja bedzie dziala na zasadzie pytan pomocniczych, ale poki co takich nie mamy
    let user = searchUser(email);
    if(user.password == password){
        user.password = 'reset';
        await user.save();
    }else{
        prompt("Password doesnt match")
    }
}

exports.editPassword = editPassword;
exports.reset_password = reset_password;
exports.User = User;
exports.createUser = createUser;
exports.checkIfUserExistsByEmail = checkIfUserExistsByEmail;
//module.exports = mongoose.model('User', userSchema);