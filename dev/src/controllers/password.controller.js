const sgMail = require('@sendgrid/mail');
const { User } = require('../models/user.model')
const crypto = require('crypto');
const passwordChange = async (req,res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 saat boyunca kullanılabilir
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
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
}

const passwordChangeScreen = async (req,res) => {
    try {
        const { token } = req.params;

        // şifre yenileme süresi dolmamış kullanıcıyı bulur
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
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
}

const savePasswordScreen = async (req,res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
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
}

module.exports = {
    passwordChange,
    passwordChangeScreen,
    savePasswordScreen,
}