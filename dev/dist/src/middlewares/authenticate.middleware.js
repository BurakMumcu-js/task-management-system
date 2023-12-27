"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../lib/error");
const dotenv_1 = __importDefault(require("dotenv"));
const UserService_1 = __importDefault(require("../services/UserService"));
dotenv_1.default.config({ path: 'src/.env' });
const authenticateMiddleware = (req, res, next) => {
    console.log('request baslangıc');
    console.log(req.headers);
    console.log('request bitiş');
    const token = req.headers.authorization;
    if (!token)
        throw error_1.UserNotExists;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.userId;
        const user = UserService_1.default.findOne({ _id: userId });
        if (!user)
            throw error_1.UserNotExists;
        next();
    }
    catch (e) {
        next(e);
    }
};
exports.authenticateMiddleware = authenticateMiddleware;
