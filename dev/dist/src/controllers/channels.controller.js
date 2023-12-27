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
exports.addChannel = exports.createChannel = exports.findChannels = exports.deleteChannel = void 0;
const ChannelService_1 = __importDefault(require("../services/ChannelService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const uuid_1 = require("uuid");
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../lib/error");
const createChannel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, user } = req.body;
        const channelExist = yield ChannelService_1.default.findOne({ name: name });
        const creator = yield UserService_1.default.findOne({ email: user.email });
        if (!creator)
            throw error_1.UserNotExists;
        if (channelExist) {
            throw error_1.ChannelExists;
        }
        else {
            const channel = yield ChannelService_1.default.create({
                name: name,
                password: password,
                creator: user.email,
                _id: (0, uuid_1.v4)(),
                users: [{ name: user.email, tasks: [] }],
            });
            yield UserService_1.default.updateWhere({ _id: user._id }, { $push: {
                    role: 'creator'
                } });
            res.status(200).json({ message: `${name} isimli kanalınız başarıyla oluşmuştur`, channel: channel });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createChannel = createChannel;
const deleteChannel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channelName } = req.body;
        const channel = yield ChannelService_1.default.findOne({ name: channelName });
        if (!channel)
            throw error_1.ChannelNotExists;
        yield ChannelService_1.default.delete({ name: channelName });
        res.json({ message: `${channelName} isimli kanal başarıyla silindi` });
    }
    catch (e) {
        next(e);
    }
});
exports.deleteChannel = deleteChannel;
const addChannel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailAdded, channelName } = req.body;
        const channel = yield ChannelService_1.default.findOne({ name: channelName });
        const user = yield UserService_1.default.findOne({ email: emailAdded });
        if (!user)
            throw error_1.UserNotExists;
        if (!channel)
            throw error_1.ChannelNotExists;
        if (channel.users.includes(emailAdded))
            throw error_1.UserExists;
        else {
            const channelId = channel._id;
            yield ChannelService_1.default.updateWhere({ _id: channelId }, {
                $push: {
                    users: {
                        email: emailAdded,
                        tasks: [],
                    },
                },
            });
            mongoose_1.default.disconnect();
            res.json({ message: 'Kullanıcı başarıyla eklendi' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addChannel = addChannel;
const findChannels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield ChannelService_1.default.list();
        res.status(200).json(channels);
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.findChannels = findChannels;
