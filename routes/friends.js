const Joi = require('joi');
const { createFriend, Friend } = require('../models/friend');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../login');
const mongoose = require('mongoose');



router.post('/', async (req, res) => {
    const { error } = validateFriend(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const friend = await createFriend(req.body);
    console.log('resp:' + friend);
    res.send(friend);
    
});
    
router.delete('/:id', async(req, res) => {
   const friendship = Friend.findByIdAndRemove(req.params.id, (error, data) => {
       if (error) {
           console.log('Wrong id!');
           return res.status(400).send(error.details[0].message);
       } else {
           if (data){
               return res.status(200).send('User successfully deleted!');
           } else  {
               return res.status(400).send('User not found!');
           }
       }
   });
});


function validateFriend(user) {
    console.log(JSON.stringify(user));
    const schema = {
        userId: Joi.string().min(3).max(50).required(),
        friendId: Joi.string().min(6).max(24).required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;

