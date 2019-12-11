const Joi = require('joi');
const FriendsModule = require('../friendsmanager');
const app = require('express');
const router = app.Router();
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


router.put('/:id', async(req,res)=>{
    const { error } = validateFriend(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const friend = await Friend.findByIdAndUpdate(req.params.id,{
        typeofFriend: req.body.typeofFriend
    },{new: true});

    res.send(friend);
});

router.delete('/:id', async (req,res)=>{
    const friend = await Friend.findByIdAndRemove(req.params.id);

    if(!friend) return res.status(404).send('This user is not on your friends list');
    
    res.send(friend);
});




module.exports = router;