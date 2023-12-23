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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModel = exports.ChannelSchema = void 0;
const Joi = __importStar(require("joi"));
const mongoose_1 = require("mongoose");
// Şema tanımı
const ChannelSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/).required(),
    creator: Joi.string().min(2).max(30).required(),
    users: Joi.array(),
});
exports.ChannelSchema = ChannelSchema;
// Model tanımı
const ChannelModel = (0, mongoose_1.model)('Channel', new mongoose_1.Schema({
    _id: String,
    name: String,
    password: String,
    creator: String,
    users: Array,
}));
exports.ChannelModel = ChannelModel;
