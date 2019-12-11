const express = require('express');
const Joi = require('Joi');
const commentManager = require('../domain/commentmanager');
const router = express.Router();

//  !!NIE WIEM CZY TO PONIŻEJ JEST DOBRZE!! Po za tym nie wiem gdzie będą komentarze wyświetlane...
router.get('/', (req, res) => {             //Pokaż wszystkie komentarze w bazie danych
    res.send(comments);
  });
  
router.post('/', async (req, res) => {      //Opublikowanie komentarza
    const { error } = validateComment(req.body);        //Walidacja komentarza
    if (error) return res.status(400).send(error.details[0].message);
  
    //Tworzenie komentarza za pomocą eksportowanej funkcji z commentmanager.js
    const comment = await commentManager.createComment(req.body);
    // Nadanie odpowiedniego ID...
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

router.get('/:id', (req, res) => {          //Szukanie koemntarza w bazie danych za pomocą ID
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

//Eksport do index.js
module.exports = router;







//Funkcja walidująca komentarz ?Potrzebne?
function validateComment(comment) {
    const schema = {
      //id: Joi.required(),             ID komentarza w bazie danych
      username: Joi.required(),
      date: Joi.required(),
      content: Joi.required(),
      //underPost: Joi.required(),      ID postu pod którym komentarz się znajduje?
    };
  
    return Joi.validate(comment, schema);
};