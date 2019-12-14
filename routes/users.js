const Joi = require('joi');
const UserManagerModule = require('../domain/usermanager');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const userManager = new UserManagerModule();
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


// router.get('/', (req, res) => {
//     res.send(users);
// });

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    const user = await User.createUser(req.body);
    console.log('resp:' + user);
    res.send(user);
});

router.put('/:id', async (req, res) => {       
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const result = User.updateUser(id, req.body);
    res.send(result);
});

let handlers = new HandlerGenerator();
router.post('/login', handlers.login);
//router.get('/', middleware.checkToken, handlers.index);

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