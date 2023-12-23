"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFailed = exports.ChannelNotExists = exports.ChannelExists = exports.UserNotExists = exports.UserExists = exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ResponseError = ResponseError;
exports.UserExists = new ResponseError('Kullanıcı zaten mevcut', 400);
exports.UserNotExists = new ResponseError('Kullanıcı Mevcut Değil', 400);
exports.ChannelExists = new ResponseError('Böyle bir Kanal Bulunmaktadır', 400);
exports.ChannelNotExists = new ResponseError('Kanal Bulunamadı', 400);
exports.AuthFailed = new ResponseError('Yetkiniz Yok!', 401);
