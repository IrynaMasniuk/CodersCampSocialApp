const mongoose = require('mongoose');
const Joi = require('joi');

const openDbConnection = require('../middleware/db');
openDbConnection();

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 100
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    lastEditDate: {
        type: Date,
        default: Date.now  ,        
    }, 
    likes: {
        type: Number,
        default: 0,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
        },
});

const Comment = mongoose.model('Comment', commentSchema);

async function createComment(commentData) {
    const comment = new Comment({
        content: commentData.content,
        userId: commentData.userId,
    });

    try {
        const result = await comment.save();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
};

function validateComment(comment) {
    const schema = {
      userId: Joi.required(),
      createDate: Joi.required(),
      content: Joi.required(),
    };
  
    return Joi.validate(comment, schema);
};

exports.Comment = Comment;
exports.createComment = createComment();
exports.validateComment = validateComment();
