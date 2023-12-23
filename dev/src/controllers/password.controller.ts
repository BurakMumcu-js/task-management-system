import sgMail from '@sendgrid/mail';
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import crypto from 'crypto';
require('dotenv').config({path: 'src/.env'});

if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is not defined in the environment variables.');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const passwordChange = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await UserService.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // Şu anki tarihine bir saat ekleniyor        // 1 saat boyunca kullanılabilir
        await user.save();

        const msg = {
            to: email,
            from: 'from@mail.com',
            subject: 'Parola Sıfırlama',
            text: 'Parolanız sıfırlandı: Yeni Parolanız: 123456',
        };

        await sgMail.send(msg);

        console.log('E-posta gönderildi.');
        res.status(200).json({ message: 'Şifre sıfırlama e-postası gönderildi.' });
    } catch (e:any) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const passwordChangeScreen = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        // şifre yenileme süresi dolmamış kullanıcıyı bulur
        const user = await UserService.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token.' });
        }
        // reset-password.ejs dosyası token ile birlikte render edilir
        res.render('reset-password', { token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Bir hata oluştu.' });
    }
};

const savePasswordScreen = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await UserService.findOne({
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
        await user.save();

        return res.status(200).json({ message: 'Parola başarıyla sıfırlandı.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Bir hata oluştu.' });
    }
};

export {
    passwordChange,
    passwordChangeScreen,
    savePasswordScreen 
}