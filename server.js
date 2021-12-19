require('dotenv').config();
const port = process.env.PORT || 3000;
const googleFromEmail = process.env.GOOGLE_FROM_EMAIL;
const toEmail = process.env.TO_EMAIL;
const googleFromPassword = process.env.GOOGLE_FROM_PASSWORD;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const yandexFromEmail = process.env.YANDEX_FROM_EMAIL;
const yandexFromPassword = process.env.YANDEX_FROM_PASSWORD;
const body = "test";
const nodeMailer = require('nodemailer');
const nodeCron = require('node-cron');

const express = require('express');
const app = express();
app.listen(port, () => {console.log('test')});

const googleEmail = {
    from: googleFromEmail,
    to: toEmail,
    subject: 'testmail',
    text: body
}
const googleTransporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: googleFromEmail,
        pass: googleFromPassword,
        clientId: clientId,
        clientSecret: clientSecret
    }
});
const yandexEmail = {
    from: yandexFromEmail,
    to: toEmail,
    subject: 'test',
    text: body,
    attachments: [
        {
            fileName: 'chap10-Tree-CSharp',
            path: './chap10-Tree-CSharp.pdf'
        }
    ]
}
const yandexTransporter = nodeMailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: yandexFromEmail,
        pass: yandexFromPassword
    }
        
    }
);
nodeCron.schedule('* * * * *', () => {
    async function sendEmail() {
        let info = await yandexTransporter.sendMail(yandexEmail);
        console.log(info.messageId);
    }
    sendEmail().catch(console.error);
});
// googleTransporter.sendMail(google, (error, info)=> {
//     if(error){
//         return console.log(error);
//     }
//     console.log('success');
// });

// yandexTransporter.sendMail(yandexEmail, (error, info)=> {
//     if(error){
//         return console.log(error);
//     }
//     console.log('success');
// });