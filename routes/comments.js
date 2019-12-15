const mongoose = require('mongoose');
const express = require('express');
const Comment = require('../models/comment');
//const User = require('../models/user2.js');
const router = express.Router();


router.get('/:userId', (req, res) => {
    const comment = Comment.find(c => c.userId === parseInt(req.params.userId));
    if (!comment) return res.status(404).send('There are no comments for the user with the given Id.');
    res.send(comment);
});

router.post('/', async (req, res) => {
    const { error } = Comment.validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = await Comment.createComment(req.body);
    console.log(comment)
    res.send(comment);
});
  
router.put('/:id', (req, res) => {
    const comment = Comment.findByIdAndUpdate(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given Id was not found.');
    res.send(comment);
});
  
router.delete('/:id', (req, res) => {
    const comment = Comment.findByIdAndRemove(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given Id was not found.');
    res.send(comment);
});

module.exports = router;