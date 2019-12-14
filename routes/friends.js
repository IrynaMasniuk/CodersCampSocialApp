const users = require('../models/user');
const mongoose = require('mongoose');
const app = require('express');
const router = app.Router();

router.post('/', async (req,res)=>{
const user = await users.User.findById(req.params.user_id);
if (!user) return res.status(404).send('The user with the given ID was not found.');

user = await user.listOfFriends.push(req.params.friend_id);
res.send(user.listOfFriends)
});

router.get('/', async (req,res)=>{
 const user = await users.User.findById(req.params._id);
 if (!user) return res.status(404).send('The user with the given ID was not found.');

 res.send(user.listOfFriends)
});

router.delete('/', async (req,res)=>{
const user = await users.User.findById(req.params.user_id);
if (!user) return res.status(404).send('The user with the given ID was not found.');

const friend = await user.listOfFriends.findByIdAndRemove(req.params.friend_id);

//const friend = await user.listOfFriends.findById(req.body.friend_id);
if (!friend) return res.status(404).send('The friend with the given ID was not found.');

/*for( var i = 0; i < user.listOfFriends.length; i++){ 
    if ( user.listOfFriends[i] === friend) {
      user.listOfFriends.splice(i, 1); 
    }
 }*/

res.send(friend);
});



module.exports = router;

