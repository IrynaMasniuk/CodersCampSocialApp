const friendsDes = require('./friend');

class FriendManager {
    async createFriend(user) {
        const existingFriend = user.friendshipState;
        if (existingFriend) {
            return {
                message: 'This user has already added to your friend list',
                status: 'failed',
            }
        } else {
            const newFriend = await friendsDes.createFriend(user);
           
                if (newFriend) {
                    return {
                        message: null,
                        status: 'ok',
                    }
                }
    }
}
}

module.exports = friendsDes;