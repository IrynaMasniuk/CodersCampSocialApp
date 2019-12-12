const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost/application')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connected to MongoDB...'))

const Friend = new mongoose.model('Friend', new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 50,
        },             
    dateOfBirth: { 
        type: String,              
        required: true 
        },
    email:{ 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
            },
    typeofFriend: {
        type: String,
        required: true,
        enum: ['best friend', 'friend', 'familiar', 'colleague', 'relative']
            },
    friendshipState:{ //true - you are already friends, false - you are not friends
        type: Boolean,
        required: true
    }
}));

async function createFriend(user){
    const friend = new Friend({
        username: user.username,           
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        typeofFriend: user.typeofFriend,
        friendshipState: user.friendshipState
});

try {
    const result = await friend.save();
    console.log(result);
    return result;
}
catch (ex) {
    console.log(ex.message);
    return undefined;
}

}

function validateFriend(friend){
    console.log(JSON.stringify(friend));
const schema = {
    username: Joi.string().min(2).max(50).required(),
    dateOfBirth: Joi.string().required(),
    email: Joi.string().min(5).max(255).required(),
    typeofFriend: Joi.any().valid('best friend', 'friend', 'familiar', 'colleague', 'relative'),
    friendshipState: Joi.boolean()
};
return Joi.validate(friend, schema);
};



exports.Friend = Friend;
exports.createFriend = createFriend;
exports.validateFriend = validateFriend;