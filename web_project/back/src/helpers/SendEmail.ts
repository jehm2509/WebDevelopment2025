import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function sendEmail(to: string, subject: string, htmlContent: string) {

    try {

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        } as SMTPTransport.Options);

        const info = await transporter.sendMail({
            from: '"Appointments App" <admin@localhost.com>',
            to,
            subject,
            html: htmlContent
        });

        console.log('Email enviado: %s', info.messageId);
    } catch (error) {
        console.log('error sending email');
        console.log(error);
    }

}
