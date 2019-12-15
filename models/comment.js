//                          Prawdopodobnie plik do usunięcia... Wszytsko znajdzie się w post.js

const mongoose = require('mongoose');

const openDbConnection = require('../middleware/db');
openDbConnection();

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