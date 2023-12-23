const {userSchema} = require('../models/user.model')
const {channelSchema} = require('../models/channel.model')
const validateMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            console.log(req)
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error)
        }
    };
};

const validateUser = validateMiddleware(userSchema);
const validateChannel = validateMiddleware(channelSchema)
module.exports = {
    validateUser,
    validateChannel,
};