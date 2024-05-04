import nodemailer from "nodemailer";

export const sendEmails = (to, msg) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // Your Gmail address
            pass: 'your_password' // Your Gmail password
        }
    });

    let mailOptions = {
        from: 'your_email@gmail.com', // Sender address
        to: 'recipient@example.com', // List of recipients
        subject: 'Test Email', // Subject line
        html: '<h1>Hello from Nodemailer!</h1><p>This is HTML content.</p>' // HTML content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            return;
        }
        console.log('Email sent successfully!');
        console.log(info);
        return info;
    });
}