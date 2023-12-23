import * as Joi from 'joi';
import { Document, Schema, model, Model } from 'mongoose';

// Döküman tipi tanımı
interface ChannelDocument extends Document {
  _id: string;
  name: string;
  password: string;
  creator: string;
  users: any[];
}

// Şema tanımı
const ChannelSchema = Joi.object<ChannelDocument>({
  _id: Joi.string(),
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/).required(),
  creator: Joi.string().min(2).max(30).required(),
  users: Joi.array(),
});

// Model tanımı
const ChannelModel: Model<ChannelDocument> = model<ChannelDocument>('Channel', new Schema<ChannelDocument>({
  _id: String,
  name: String,
  password: String,
  creator: String,
  users: Array,
}));

export {
  ChannelDocument,
  ChannelSchema,
  ChannelModel,
};
