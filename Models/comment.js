const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/application')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const commentSchema = new mongoose.Schema({                 //Schemat komentarza
    author: {         //Autor komentarza, potrzebne do edycji
        type: String, 
        required: true,
        },
    content:{           //Komentarz
        type: String,
        required: true,
    },
    postID:{            //ID postu pod jakim, ten komentarz się znajduje
       type: String,
        required: true,
    },
});

const Comment = mongoose.model('Comment', commentSchema);

async function createComment(commentData){
    const comment = new Comment({
        author: commentData.author,
        content: commentData.content,
        postID: commentData.postID,
    });

    try {
        const result = await comment.save();
        console.log(result);
        return result;
    }
    catch (ex) {
        console.log(ex.message);
        return undefined;
    }
};

module.exports = createComment;