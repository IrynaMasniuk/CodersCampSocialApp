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
            ref: 'User'
        }],
    loggedin:{
        required: false,
        type : boolean(),
        default: false
    }
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
        hobbies: userData.hobbies,
        loggedin: true
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

async function checkIfUserExistsByEmail(email) {
    const temp = await User.findOne({ "email": email });
    console.log('foundUser:' + JSON.stringify(temp));
    return temp;
}

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
async function editPassword(data){
    let mail = data.email;
    let pass = data.password;
    let new_password = data.password;
    const temp = await User.findOne({ "email": mail });
    let  tempPass = temp.password;
    if(tempPass === pass){
        temp.password = new_password;
        console.log("pass changed");
        await User.updateOne({email:mail}, function(err, res){

        })
    }
    else console.log('bad password');
}
async function reset_password(data){
    let mail = data.email;
    let pass = data.password;
    let new_password = data.password;
    const temp = await User.findOne({ "email": mail });
    let  tempPass = temp.password;
    if(tempPass === pass){
        temp.password = "reset";
        console.log("pass changed to : reset");
        await mongoose.temp.update;
    }
    else console.log('bad password');
}
async function login(data){
    let mail = data.email;
    let pass = data.password;
    const temp = await User.findOne({ "email": mail });
    let  tempPass = temp.password;
    if(tempPass === pass){

        console.log("logged in");
    }
    else{console.log('bad password');}
}

exports.editPassword = editPassword;
exports.reset_password = reset_password;
exports.User = User;
exports.login = login;
exports.createUser = createUser;
exports.checkIfUserExistsByEmail = checkIfUserExistsByEmail;
//module.exports = mongoose.model('User', userSchema);