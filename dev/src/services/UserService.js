const {User} = require('../models/user.model');
const BaseService = require('./BaseService');
class UserService extends BaseService {
    constructor() {
        super(User);
    }

    findById(id,select){
        return User.findById(id).select(select);
    }
}

module.exports = new UserService();
