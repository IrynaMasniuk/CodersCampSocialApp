const {Post} = require('../models/post');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {       // znajdowanie wszystkich postów zapisanych w bazie i wyświetlenie od najświeższych 
    const posts = await Post.find().sort({lastEditDate: -1});
    res.send(posts);
});

router.get('/:userId', async (req, res) => {          // znajdowanie postów dla danego usera 
    // const post = await Post.find(c => c.userId === parseInt(req.params.userId));
    const post = await Post.find({"userId": req.params.userId});
    
    if (!post) return res.status(404).send('There are no posts for the user with the given Id.');
    res.send(post);
});

router.post('/', async (req, res) => {
    // const { error } = validatePost(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let post = new Post({
        content: req.body.content,
        userId: req.body.userId,
        isPublished: true,
    });

    post = await post.save();
    res.send(post);
});

router.put('/:id', async (req, res) => {          // update posta na podstawie podanego Id
    // const { error } = validatePost(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findByIdAndUpdate(req.params.id, 
        { 
            content: req.body.content,
            isPublished: true
        },
         {new: true} );
    if (!post) return res.status(404).send('The post with the given Id was not found.');     
    res.send(post);
});
  
router.delete('/:id', async (req, res) => {       // usunięcie posta dla wskazanego Id
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) return res.status(404).send('The post with the given Id was not found.');
    res.send(post);
});

module.exports = router;
