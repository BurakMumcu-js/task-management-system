"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const BaseService_1 = __importDefault(require("./BaseService"));
class UserService extends BaseService_1.default {
    constructor() {
        super(user_model_1.UserModel);
    }
}
exports.default = new UserService();
