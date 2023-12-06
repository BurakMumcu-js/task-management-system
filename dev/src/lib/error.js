class ResponseError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status
    }
}

module.exports = {
    ResponseError,
    UserExısts: new ResponseError('Kullanıcı zaten mevcut', 400),
    UserNotExists: new ResponseError('Kullanıcı Mevcut Değil',400),
    ChannelExists: new ResponseError('Kanal Zaten Mevcut',400),
    ChannelNotExists: new ResponseError('Kanal Bulunamadı',400),
}