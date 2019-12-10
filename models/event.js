const Joi = require('joi');
const mongoose = require('mongoose');

const Event = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    date: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String
    }

}));

function validateEvent(event) {
    const schema = {
        name: Joi.string().min(5).max(100).required(),
        date: Joi.date().required(),
        place: Joi.string().min(5).max(100).required(),
        description: Joi.string()
    };

    return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateEvent;