import * as Joi from 'joi';
import { Document, Schema, model } from 'mongoose';

interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isAdmin: boolean;
}

const UserSchema = Joi.object<UserDocument>({
  _id: Joi.string(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/).required(),
  resetPasswordToken: Joi.string(),
  resetPasswordExpires: Joi.date(),
  isAdmin: Joi.boolean().default(false),
});

const UserModel = model<UserDocument>('User', new Schema<UserDocument>({
  _id: String,
  name: String,
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isAdmin: Boolean,
}));

export {
UserDocument,
  UserSchema,
  UserModel,
};
