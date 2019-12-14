const users = require('../models/user');
const Joi = require('joi');
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

const ind = await user.listOfFriends.indexOf(req.params.friend_id);
if (!ind) return res.status(404).send('The friend with the given ID was not found.');

user.listOfFriends.splice(ind,1);

res.send(user.listOfFriends);
});

module.exports = router;

