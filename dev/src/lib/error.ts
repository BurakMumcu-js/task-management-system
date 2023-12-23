export class ResponseError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export const UserExists = new ResponseError('Kullanıcı zaten mevcut', 400);
export const UserNotExists = new ResponseError('Kullanıcı Mevcut Değil', 400);
export const ChannelExists = new ResponseError('Böyle bir Kanal Bulunmaktadır', 400);
export const ChannelNotExists = new ResponseError('Kanal Bulunamadı', 400);
export const AuthFailed = new ResponseError('Yetkiniz Yok!', 401); 
