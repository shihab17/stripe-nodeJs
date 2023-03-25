require('dotenv').config();
var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: parseInt(process.env.MAIL_PORT),
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
});

const sendMail = async (to, subject, body, cc = [], from = null, attachments = []) => {
    try {
        const mailOptions = {
            from: from || process.env.MAIL_FROM,
            to: to,
            title: 'Shihab',
            subject: subject,
            html: body
        };

        if (cc && cc.length) mailOptions.cc = cc;
        if (attachments && attachments.length) mailOptions.attachments = attachments;

        /* return new Promise(resolve => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) resolve({ error });
                resolve({success: info});
            });
        }); */
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        return info;
    } catch (error) {
        console.log("🚀 ~ file: mailer.js:42 ~ sendMail ~ error:", error)
        return { error }
    }
}
module.exports.sendMail = sendMail;