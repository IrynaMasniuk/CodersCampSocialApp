const mongoose = require('mongoose');
const Joi = require('joi');

const openDbConnection = require('../middleware/db');
openDbConnection();

const commentSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastEditDate: {
        type: Date,
        default: Date.now       
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
        }],
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    
});

const Comment = mongoose.model('Comment', commentSchema);

async function createComment(commentData) {
    const comment = new Comment({
        content: commentData.content,
        createDate: commentData.createDate,
        lastEditDate: commentData.lastEditDate,
        post: commentData.post,
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
      content: Joi.string().min(1).max(100).required(),
      createDate: Joi.date().required(),
      lastEditDate: Joi.date(),
      post: Joi.string().min(24).max(24),
      userId: Joi.string().min(24).max(24)
    };
  
    return Joi.validate(comment, schema);
};

exports.Comment = Comment;
exports.createComment = createComment;
exports.validateComment = validateComment;
