const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/application')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connected to MongoDB...'))

const friendSchema = new mongoose.Schema({
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
});

const Friend = mongoose.model('Friend', friendSchema);

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

module.exports = createFriend;