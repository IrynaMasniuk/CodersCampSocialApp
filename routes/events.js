const {
    Event,
    validate,
    create
} = require('../models/event');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
// const eventManager = new EventManagerModule();


router.get('/', async (req, res) => {
    const events = await Event.find()
    res.send(events);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let event = await create(req.body)

    event = await event.save();

    res.send(event);
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const event = await Event.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });

    if (!event) return res.status(404).send('The event with the given ID was not found.');

    res.send(event);
});

router.delete('/:id', async (req, res) => {
    const event = await Event.findByIdAndRemove(req.params.id);

    if (!event) return res.status(404).send('The event with the given ID was not found.');

    res.send(event);
});

router.get('/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).send('The event with the given ID was not found.');

    res.send(event);
});

module.exports = router;