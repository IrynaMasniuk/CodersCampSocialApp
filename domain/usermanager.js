const userDbUtils = require('../lodels/user');

class UserManager {
    async createUser(userData) {
        const existingUser = await userDbUtils.searchUser(userData.email);// search(userdata);
        if (existingUser) {
            return {
                message: 'User with such e-mail is already registered',
                status: 'failed',
                newUserId: null
            }
        } else {
            const newUser = await userDbUtils.createUser(userData);
            // newUser.then((x) => {
                if (newUser) {
                    return {
                        message: null,
                        status: 'ok',
                        newUserId: newUser._id
                    }
                }
            // }).catch(x => {
                // console.log(x);
                else
                return {
                    message: 'User with such e-mail is already registered',
                    status: 'failed',
                    newUserId: null
                };
            // })
        }
    }
}

module.exports = UserManager;