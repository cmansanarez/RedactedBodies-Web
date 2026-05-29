import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMessage(subject, text) {
    await resend.emails.send({
        from: 'Noir Mak <cam@noirmak.com>',
        to: process.env.EMAIL_TO,
        subject: subject,
        text: text
    });
}
