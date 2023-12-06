const {Channel} = require('../models/channel.model');
const BaseService = require('./BaseService');
class ChannelService extends BaseService {
    constructor() {
        super(Channel);
    }
    delete(where){
        return Channel.deleteOne(where);
    }
}

module.exports = new ChannelService();