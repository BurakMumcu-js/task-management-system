import { FilterQuery } from 'mongoose';
import { ChannelModel, ChannelDocument } from '../models/channel.model';
import BaseService from './BaseService';

class ChannelService extends BaseService<ChannelDocument> {
    constructor() {
        super(ChannelModel);
    }
    findOne(where: FilterQuery<ChannelDocument>): Promise<ChannelDocument | null> {
        return ChannelModel.findOne(where).exec();
    }
}

export default new ChannelService();

