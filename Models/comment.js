//                          Prawdopodobnie plik do usunięcia... Wszytsko znajdzie się w post.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/application')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    }
});

const Comment = mongoose.model('Comment', commentSchema);

async function createComment(commentData){
    const comment = new Comment({
        content: commentData.content
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