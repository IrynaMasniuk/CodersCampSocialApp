const mongoose = require('mongoose');
const express = require('express');
const Post = require('../models/post2.js')
const Comment = require('../models/comment2.js')  // 'comment2.js' to byłby aktualny 'comment.js' uzupełniony o 'commentId' (?)
const User = require('../models/user2.js')  // 'user2.js' to byłby aktualny 'user.js' uzupełniony o 'userId' (?)  
const router = express.Router();


router.get('/:userId', (req, res) => {          // znajdowanie postów dla danego usera 
    const post = post.find(c => c.userId === parseInt(req.params.userId));
    if (!post) return res.status(404).send('There are no posts for the user with the given Id.');
    res.send(post);
});

router.post('/', async (req, res) => {
    const post = await Post.createPost(req.body);
    res.send(post);
});
  
router.put('/:id', (req, res) => {          // update posta na podstawie podanego Id
    const post = Post.findByIdAndUpdate(req.params.id);
    res.send(post);
});
  
router.delete('/:id', (req, res) => {       // usunięcie posta dla wskazanego Id
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) return res.status(404).send('The post with the given Id was not found.');
    res.send(post);
});
