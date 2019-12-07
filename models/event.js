const Joi = require('joi');
const mongoose = require('mongoose');

const Event = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

}));

function validateEvent(event) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    };

    return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateEvent;