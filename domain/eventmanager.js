const event = require('../models/event');

class EventManager {
    async createEvent(e) {
        const existingEvent = e.friendshipState;
        if (existingEvent) {
            return {
                message: 'This user has already added to your friend list',
                status: 'failed',
            }
        } else {
            const newEvent = await event.createEvent(e);

            if (newEvent) {
                return {
                    message: null,
                    status: 'ok',
                }
            }
        }
    }
}

module.exports = EventManager;