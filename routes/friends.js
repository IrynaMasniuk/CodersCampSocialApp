const Joi = require('joi');
const app = require('express');
const router = app.Router();
const FriendsModule = require('../friendsmanager');
const friendManager = new FriendsModule();


router.get('/api.users/:id/friends/:id', (req,res)=>{
    const friend = friends.find(c => c.id === parseInt(req.params.id));
    if(!friend) res.status(404).send('This person is not in your friends list'); 
    res.send(friend)
});

router.get('/api.users/:id/friends', (req,res)=>{
    res.send(friends);
})

router.post('/api.users/:id/friends',  async (req, res) => {
    const { error } = validateFriend(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    const friend = await friendManager.createFriend(req.body);
    console.log('new: ' + friend);
    res.send(friend);
});

function validateFriend(friend){
    console.log(JSON.stringify(friend));
const schema = {
    username: Joi.string().min(2).max(50).required(),
    dateOfBirth: Joi.string().required(),
    email: Joi.string().min(5).max(255).required(),
    typeofFriend: Joi.any().valid('best friend', 'friend', 'familiar', 'colleague', 'relative'),
    riendshipState: Joi.boolean()
};
return Joi.validate(friend, schema);
};



module.exports = router;