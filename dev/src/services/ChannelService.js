const {Channel} = require('../models/channel.model');
const BaseService = require('./BaseService');
class ChannelService extends BaseService {
    constructor() {
        super(Channel);
    }
    delete(where){
        return Channel.deleteOne(where);
    }
    findOne(where) {
        return Channel.findOne(where);
    }
}

module.exports = new ChannelService();