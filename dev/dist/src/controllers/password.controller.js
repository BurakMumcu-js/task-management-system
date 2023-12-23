"use strict";
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
exports.savePasswordScreen = exports.passwordChangeScreen = exports.passwordChange = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const UserService_1 = __importDefault(require("../services/UserService"));
const crypto_1 = __importDefault(require("crypto"));
require('dotenv').config({ path: 'src/.env' });
if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is not defined in the environment variables.');
}
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const passwordChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield UserService_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }
        const resetToken = crypto_1.default.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // Şu anki tarihine bir saat ekleniyor        // 1 saat boyunca kullanılabilir
        yield user.save();
        const msg = {
            to: email,
            from: 'from@mail.com',
            subject: 'Parola Sıfırlama',
            text: 'Parolanız sıfırlandı: Yeni Parolanız: 123456',
        };
        yield mail_1.default.send(msg);
        console.log('E-posta gönderildi.');
        res.status(200).json({ message: 'Şifre sıfırlama e-postası gönderildi.' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});
exports.passwordChange = passwordChange;
const passwordChangeScreen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        // şifre yenileme süresi dolmamış kullanıcıyı bulur
        const user = yield UserService_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token.' });
        }
        // reset-password.ejs dosyası token ile birlikte render edilir
        res.render('reset-password', { token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Bir hata oluştu.' });
    }
});
exports.passwordChangeScreen = passwordChangeScreen;
const savePasswordScreen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = yield UserService_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token.' });
        }
        //şifre güncellenir
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        yield user.save();
        return res.status(200).json({ message: 'Parola başarıyla sıfırlandı.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Bir hata oluştu.' });
    }
});
exports.savePasswordScreen = savePasswordScreen;
