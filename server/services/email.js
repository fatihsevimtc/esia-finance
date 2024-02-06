const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    service: process.env.EMAIL_SERVICE,
});

const sendEmail = async (subject, text, to) => {
    console.log('Sending email...');
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to || process.env.RECIPIENT_EMAIL,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent:', subject);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
