// Nie do końca wiem, czy ten kod jest potrzebny...

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({                 //Schemat komentarza
    //id: {             //Nie wiem czy ID jest potrzebne do bazy danych MongoDB
    //    type: String,
    //   required: true,
    //},
    username: {         //Autor komentarza
        type: String, 
        required: true,
        },
    Date: {             //Data napisania komentarza
        type: String,
        required: true,
            },
    Content:{           //Komentarz
        type: String,
        required: true,
    },
    //underPost:{         //Pod jakim postem ten komentarz się znajduje???
    //   type: String,
    //    required: true,
    //},
});

const Comment = mongoose.model('Comment', commentSchema);   //Klasa na podstawie schematu moongose

async function createComment(commentData){                  //Tworzenie komentarza na podstawie klasy  
    const comment = new Comment({
        //id: commentData.id,                   ?Potrzebne?
        username: commentData.username,
        date: commentData.date,
        content: commentData.content,
        //underPost: commentData.underPost,     ?Potrzebne?
    });

    try {                                                   //Zapisywanie przy prawidłowym komentarzu
        const result = await comment.save();
        console.log(result);
        return result;
    }
    catch (ex) {
        console.log(ex.message);                            //Błąd przy nieprawidłowym komentarzu
        return undefined;
    }
};

module.exports = createComment;                             //Eksportowanie funckji tworzącej sam komentarz