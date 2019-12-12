const {Friend, createFriend, validateFriend} = require('../models/friend');
const mongoose = require('mongoose');
const app = require('express');
const router = app.Router();


router.get('/', async (req,res)=>{
    const friends = await Friend.find().sort('username');
    res.send(friends);
});

router.get('/:id', async (req,res)=>{
    const friend = await Friend.findById(req.params.id);
    if(!friend) return res.status(404).send('This user is not on your friends list');
    res.send(friend);
})

router.post('/',  async (req, res) => {
    const { error } = validateFriend(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    const friend = await Friend.findById(req.params.id)
    if(!friend) return friend = await createFriend(req.body);
    if(friend) return res.status(404).send('This person you already have as a friend');

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