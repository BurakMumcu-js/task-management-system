const {userSchema} = require('../models/user.model')
const validateUserMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error)
        }
    };
};

const validateUser = validateUserMiddleware(userSchema);

module.exports = {
    validateUser
};