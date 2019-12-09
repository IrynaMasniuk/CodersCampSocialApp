const Joi = require('joi');
const UserManagerModule = require('../usermanager');
const express = require('express');
const router = express.Router();
const userManager = new UserManagerModule();


router.get('/', (req, res) => {
    res.send();
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    const user = await userManager.createUser(req.body);
    console.log('resp:' + user);
    res.send(user);
});


router.post('/login', async (req, res)=>{
const login = await userManager.authenticate(req.body);
res.send();
});



function validateUser(user){
    console.log(JSON.stringify(user));
const schema = {
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(6).max(16).required(),
    dateOfBirth: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    work: Joi.string(),
    education: Joi.string(),
    cityOfLiving: Joi.string(),
    cityOfOrigin: Joi.string(),
    relationStatus: Joi.string().required(), // + enum?
    email: Joi.string().min(5).max(255).required(),
    hobbies: Joi.string()
};
return Joi.validate(user, schema);
}

//check if user is logged
//var sessionChecker = (req, res, next) => {
  //  if (req.session.user && req.cookies.user_sid) {
    //    res.redirect('/dashboard');
    //} else {
     //   next();
    //}
//};





module.exports = router;