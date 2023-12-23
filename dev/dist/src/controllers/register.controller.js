"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.register = void 0;
const uuid_1 = require("uuid");
const jwt = __importStar(require("jsonwebtoken"));
const UserService_1 = __importDefault(require("../services/UserService"));
const error_1 = require("../lib/error");
require('dotenv').config({ path: 'src/.env' });
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('register is coming');
            const { name, email, password } = req.body;
            const users = yield UserService_1.default.findOne({ email: email });
            if (users) {
                throw error_1.UserExists;
            }
            let user = UserService_1.default.create({
                _id: (0, uuid_1.v4)(),
                name: name,
                email: email,
                password: password,
            });
            const payload = {
                user: user,
            };
            const token = jwt.sign(payload, process.env.secretKey, process.env.options);
            res.json({ user: user, token: token });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.register = register;
