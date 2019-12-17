const Joi = require('joi');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../login');
const mongoose = require('mongoose');

//Sprawdzanie tokenów, tutaj chyba najbardziej pasuje
class HandlerGenerator {
    login (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        let mockedUsername = username;
        let mockedPassword = 'random';

        if (username && password) {
            if (username === mockedUsername && password === mockedPassword.password) {
                let token = jwt.sign({username: username},
                    config.secret,
                    { expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } else {
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }
    index (req, res) {
        res.json({
            success: true,
            message: 'Index page'
        });
    }
}

// koniec tokenizatora :P

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    const user = await User.createUser(req.body);
    console.log('resp:' + user);
    res.send(user);
});

router.put('/:id', async (req, res) => { 
    console.log('Validating...');
    const { error } = validateUser(req.body);
    if (error) { return res.status(400).send(error.details[0].message);}
    console.log('Updating...')
    const user = User.User.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
        if (error) {
            console.log('Wrong id format, provide correct id!');
            console.log("Error occured while updating, check error details: " + JSON.stringify(error));
            return res.status(400).send(error.details[0].message);
        } else {
            if (data){
                console.log('id found&correct, data updated');
                return res.status(200).send('User successfully updated!');
            } else  {
                console.log('id not found');
                return res.status(400).send('User not found!');
            } 
        }
});
});

router.delete('/:id', async(req, res) => {
     console.log('Started deleting process...');
    const user = User.User.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            console.log('Wrong id format, provide correct id!');
            console.log("Error occured while deleting, check error details: " + JSON.stringify(error));
            return res.status(400).send(error.details[0].message);
        } else {
            if (data){
                console.log('id found&correct, document deleted');
                return res.status(200).send('User successfully deleted!');
            } else  {
                console.log('id not found');
                return res.status(400).send('User not found!');
            }
        }
    });
});

let handlers = new HandlerGenerator();
router.post('/login', handlers.login);
router.get('/', middleware.checkToken, handlers.index);
router.post('/passupdate:email:password',async(req, res) =>{
    var password = req.body.password;
    var email = req.body.password;
    await editPassword(email, password);
})
router.post('/resetpassword:email:password', async(req, res)=>{
    var email = req.body.email;
    var pass = req.body.password;
    await reset_password(email, pass);
})

function validateUser(user) {
    console.log(JSON.stringify(user));
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(6).max(24).required(),
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
}

module.exports = router;