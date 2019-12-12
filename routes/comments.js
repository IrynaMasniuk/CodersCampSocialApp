const express = require('express');
const Joi = require('Joi');
const commentManager = require('../Models/comment');
const router = express.Router();

//router.get('/', (req, res) => {             //Pokaż wszystkie komentarze - czy potrzebne?
//    res.send(comments);
//});

router.get('/:id', (req, res) => {          //Szukanie koemntarza w bazie danych za pomocą ID
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

router.post('/', async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const comment = await commentManager.createComment(req.body);
    console.log(comment);
    res.send(comment);
});
  
router.put('/:id', (req, res) => {          //Akutalizowanie komentarza w bazie danych za pomocą ID
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    comment.name = req.body.name;
    res.send(comment);
});
  
router.delete('/:id', (req, res) => {       //Usuwanie komentarza w bazie danych za pomocą ID
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
  
    res.send(comment);
});

module.exports = router;


//Funkcja walidująca komentarz
function validateComment(comment) {
    const schema = {
      author: Joi.required(),
      content: Joi.required(),
      posID: Joi.required(),            //ID postu pod którym komentarz się znajduje?
    };
  
    return Joi.validate(comment, schema);
};