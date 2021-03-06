const Joi = require('joi');
const mongoose = require('mongoose');

const openDbConnection = require('../middleware/db');
openDbConnection();

const eventSchema = new mongoose.Schema({

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
    },
    usersId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }]

});
const Event = mongoose.model('Event', eventSchema);
async function createEvent(eventData) {
    let event = new Event({
        name: eventData.name,
        date: eventData.date,
        place: eventData.place,
        description: eventData.description,
        usersId: eventData.usersId
    });
    try {
        const result = await event.save();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err.message);
        return undefined;
    }

}

function validateEvent(event) {
    const schema = {
        name: Joi.string().min(5).max(100).required(),
        date: Joi.date().required(),
        place: Joi.string().min(5).max(100).required(),
        description: Joi.string(),
        usersId: Joi.string().min(24).max(24)
    };

    return Joi.validate(event, schema);
}



exports.Event = Event;
exports.validate = validateEvent;
exports.create = createEvent;