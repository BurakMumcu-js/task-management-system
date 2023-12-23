import { Request, Response, NextFunction } from 'express';
import ChannelService from '../services/ChannelService';
import { FilterQuery } from 'mongoose';
import UserService from '../services/UserService'
import { v4 as uuidv4 } from 'uuid';
import { UserDocument } from '../models/user.model';
import { ChannelDocument } from '../models/channel.model';
import mongoose from 'mongoose';
import { ChannelNotExists, UserNotExists, UserExists, ChannelExists } from '../lib/error';

const createChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, password, creatorMail } = req.body;
        const channelExist = await ChannelService.findOne({ name: name });

        if (channelExist) {
            throw ChannelExists;
        } else {
            const channel = await ChannelService.create({
                name: name,
                password: password,
                creator: creatorMail,
                _id: uuidv4(),
                users: [{ name: creatorMail, tasks: [] }],
            });

            res.status(200).json({ message: `${name} isimli kanalınız başarıyla oluşmuştur`, channel: channel });
        }
    } catch (error) {
        next(error);
    }
};

const deleteChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { channelName }:{channelName: string} = req.body;
        const channel = await ChannelService.findOne({ name: channelName });

        if (!channel) throw ChannelNotExists;

        await ChannelService.delete({ name:channelName });

        res.json({ message: `${channelName} isimli kanal başarıyla silindi` });
    } catch (e) {
        next(e);
    }
};

const addChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { emailAdded, channelName } = req.body;
        const channel = await ChannelService.findOne({ name: channelName });
        const user = await UserService.findOne({ email: emailAdded });

        if (!user) throw UserNotExists;
        if(!channel) throw ChannelNotExists;
        if (channel.users.includes(emailAdded)) throw UserExists;
        else {
            const channelId = channel._id;

            await ChannelService.updateWhere(
                { _id: channelId },
                {
                    $push: {
                        users: {
                            email: emailAdded,
                            tasks: [],
                        },
                    },
                }
            );
            mongoose.disconnect();
            res.json({ message: 'Kullanıcı başarıyla eklendi' });
        }
    } catch (error) {
        next(error);
    }
};

const findChannels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channels = await ChannelService.list();
        res.status(200).json(channels);
        next();
    } catch (error) {
        next(error);
    }
};

export {
    deleteChannel,
    findChannels,
    createChannel,
    addChannel,
};
