import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { EmailOptions } from '../types/Email'

async function sendEmail(options: EmailOptions): Promise<void> {
    const transporter: Transporter<SMTPTransport.SentMessageInfo> =
        nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        } as SMTPTransport.Options)

    const mailOptions: nodemailer.SendMailOptions = {
        from: 'Adrian Prajsnar <adrian.prajsnar.11@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions)
}

export default sendEmail
