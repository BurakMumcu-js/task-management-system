import { Document } from 'mongoose';
import { UserModel, UserDocument } from '../models/user.model';
import BaseService from './BaseService';

class UserService extends BaseService<UserDocument> {
    constructor() {
        super(UserModel);
    }
}

export default new UserService();
