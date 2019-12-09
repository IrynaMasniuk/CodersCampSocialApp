const Joi = require('joi');
const UserManagerModule = require('../domain/usermanager');
const express = require('express');
const router = express.Router();
const userManager = new UserManagerModule();


router.get('/', (req, res) => {
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    const user = await userManager.createUser(req.body);
    console.log('resp:' + user);
    res.send(user);
});

function validateUser(user){
    console.log(JSON.stringify(user));
const schema = {
    username: Joi.string().min(3).max(50).required(),
    dateOfBirth: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    work: Joi.string(),
    education: Joi.string(),
    cityOfLiving: Joi.string(),
    cityOfOrigin: Joi.string(),
    relationStatus: Joi.string().valid('single', 'dating', 'married', 'divorced', 'complicated'),
    email: Joi.string().min(5).max(255).required(),
    hobbies: Joi.string()
};
return Joi.validate(user, schema);
};


module.exports = router;