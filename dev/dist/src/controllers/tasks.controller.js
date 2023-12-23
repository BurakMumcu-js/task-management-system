"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doneTask = exports.addTask = void 0;
const ChannelService_1 = __importDefault(require("../services/ChannelService"));
const error_1 = require("../lib/error");
const addTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, user, channel, deadline } = req.body;
        const channelExist = yield ChannelService_1.default.findOne({ name: channel });
        if (!channelExist) {
            throw error_1.ChannelNotExists;
        }
        const channelId = channelExist._id;
        const userIndex = channelExist.users.findIndex((item) => item.name === user);
        if (userIndex !== -1) {
            channelExist.users[userIndex].tasks.push({
                title: title,
                content: content,
                deadline: deadline,
            });
            yield ChannelService_1.default.updateWhere({ _id: channelId }, channelExist);
            res.status(200).json({ message: 'Görev başarıyla eklendi' });
            next();
        }
        else {
            throw error_1.UserNotExists;
        }
    }
    catch (e) {
        next(e);
    }
});
exports.addTask = addTask;
const doneTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { index, userName, channelName } = req.body;
        const channel = yield ChannelService_1.default.findOne({ name: channelName });
        if (!channel)
            return error_1.ChannelNotExists;
        const user = channel.users.find((user) => user.name === userName);
        user.tasks = user.tasks.filter((taskItem, currentIndex) => currentIndex !== index);
        yield ChannelService_1.default.update(channel._id, channel);
        res.send('Task başarıyla tamamlandı');
    }
    catch (e) {
        next(e);
    }
});
exports.doneTask = doneTask;
