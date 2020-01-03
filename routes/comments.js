const mongoose = require('mongoose');
const express = require('express');
const { Comment, createComment, validateComment} = require('../models/comment');
const router = express.Router();

router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

router.get('/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send('There are no comments with the given Id.');
    res.send(comment);
});

router.post('/', async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = await createComment(req.body);
    comment = await comment.save();
    res.send(comment);
});
  
router.put('/:id', async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = await Comment.findByIdAndUpdate(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given Id was not found.');
    res.send(comment);
});
  
router.delete('/:id', async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given Id was not found.');
    res.send(comment);
});

module.exports = router;