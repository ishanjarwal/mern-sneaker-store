import nodemailer from "nodemailer";

export const sendEmails = (to, html, subject) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_ID, // Your Gmail address
            pass: process.env.MAIL_PASSWORD // Your Gmail password
        }
    });

    let mailOptions = {
        from: 'sneakerstore@gmail.com', // Sender address
        to: to, // List of recipients
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw error;
        }
        return info;
    });
}