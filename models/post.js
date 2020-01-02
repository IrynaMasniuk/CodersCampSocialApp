const mongoose = require('mongoose');
const {User} = require('../models/user');
// const Joi = require('joi');

const Post = mongoose.model('Post', new mongoose.Schema({
    content: {            // treść posta
        type: String,
        required: true,
        minlength: 1,
        maxlength: 250
    },
    userId: {             // identyfikator autora postu
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    isPublished: {        // czy post został opublikowany
        type: Boolean,
        default: false
    },  
    createDate: {         // data utworzenia i publikacji posta  
        type: Date,
        required: true,
        default: Date.now
    },
    lastEditDate: {       // data ostatniej edycji
        type: Date,
        required: true,
        default: Date.now          
    }, 
    bgColor: {            // kolor tła postu przechowywana jako np. wartość hex
       type: String,
       default: '#fff'
    }, 
    bgImage: {            // URL do obrazka, który mógłby być tłem posta lub umieszczonym poniżej tekstu posta
        type: String,
        maxlength: 50     // max długość adresu URL
    },
    likes: {              // liczba polubień
        type: Number,
        default: 0
    },
    dislikes: {           // liczba niepolubień
        type: Number,
        default: 0
    },
    tags: {               // tablica tagów
        type: [String]
    }
}));


// function validatePost(post) {
//     const schema = {
//         content: Joi.string().min(1).max(255).required(),
//         isPublished: Joi.boolean(),
//         createDate: Joi.date().required(),
//         lastEditDate: Joi.date().required()
//     };

//     return Joi.validate(post, schema);
// }

exports.Post = Post;
// exports.validatePost = validatePost;
