const mongoose = require('mongoose');
const User = require('../models/user');
const openDbConnection = require('../middleware/db');
openDbConnection();

const friendSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }/*,
    circle:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
   }*/
});

const Friend = mongoose.model('Friend', friendSchema);

async function insertFriend(Data) {
    let friend = new Friend({
        userId: Data.userId,
        friendId: Data.friendId
    });

    try {
        const result = await friend.save();
        console.log(result);
        
        const user = await User.User.findOne({"_id":result.userId});
        const user_friend = await User.User.findOne({"_id":result.friendId});
        
         const change = await User.User.updateOne(
            {_id: result.userId},
            {$addToSet: {listOfFriends: [user_friend]}}

);
        return result;
    } catch (ex) {
        console.log(ex.message);
        return undefined;
    }
}

async function createFriend(Data) {

    const check = await Friend.find({"userId": Data.userId, "friendId": Data.friendId});
    console.log(check);

    if (check.length == 0) {
        if(Data.userId == Data.friendId){
            return {
                message: 'It is you',
                status: 'failed'
             }
        }else {
            const newFriendship = await insertFriend(Data);
            if (newFriendship) {
                return {
                    status: 'ok',
                    friendshipId: newFriendship._id
                }
            }
    } 
    }
    else {
        return { message: 'It is already exist'} 
    }
};

exports.createFriend = createFriend; 
exports.Friend = Friend;