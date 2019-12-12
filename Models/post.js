const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/application')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const postSchema = new mongoose.Schema({                 //Schemat posta
    content:{               //Post
        type: String,
        required: true,
    },
    commentsIDs:{            //Posty pod komentarzem
       type: String,
        required: true,
    },
});

const Post = mongoose.model('Post', postSchema);

async function createPost(postData){
    const comment = new Comment({

        content: postData.content,
        commentsIDs: postData.postID,
    });

    try {                                                   //Zapisywanie przy prawidłowym poście
        const result = await comment.save();
        console.log(result);
        return result;
    }
    catch (ex) {
        console.log(ex.message);                            //Błąd przy nieprawidłowym poście
        return undefined;
    }
};

module.exports = createPost;