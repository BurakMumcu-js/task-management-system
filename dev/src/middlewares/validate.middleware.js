const {userSchema} = require('../models/user.model')
const validateUserMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            // abortEarly:false gelen bütün hata mesajlarını almayı sağlar
            next();
        } catch (error) {
            res.status(400).json({ message: error.details.map((detail) => detail.message) });
        }
    };
};

const validateUser = validateUserMiddleware(userSchema);

module.exports = {
    validateUser
};