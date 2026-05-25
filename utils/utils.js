import nodemailer from 'nodemailer';

export async function sendMessage(subject, text) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions);
}
