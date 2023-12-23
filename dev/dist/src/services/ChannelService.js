"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channel_model_1 = require("../models/channel.model");
const BaseService_1 = __importDefault(require("./BaseService"));
class ChannelService extends BaseService_1.default {
    constructor() {
        super(channel_model_1.ChannelModel);
    }
    findOne(where) {
        return channel_model_1.ChannelModel.findOne(where).exec();
    }
}
exports.default = new ChannelService();
