const mongoose = require('mongoose');

const openDbConnection = require('../middleware/db');
openDbConnection();

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Post', commentSchema);

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

async function createPost(content, comments){
    const post = new Post({
        content,
        comments
    });

    try {
        const result = await post.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
        return undefined;
    }
};

createPost('Hello World!', new Comment({ content: "Hello!"}));

module.exports = createPost;


//      DZIAŁANIA NA KOMENTARZACH!

async function addComment(postId) {                         //Dodaj komentarz do posta
    const post = await Post.findById(postId);
    post.comments.push(comment);
    post.save();
};

async function updateComment(postId, updatedComment) {      //Auktualizuj kometarz pod postem
    const post = await Post.update({ _id: postId}, {
        $set: {
            'comment.content': updatedComment
        }
    });
};

async function removeComment(postId, commentId) {           //Usuń komentarz spod posta
    const post = await Post.findById(postId);
    const comment = await post.findById(commentId);
    comment.remove();
    post.save();
};