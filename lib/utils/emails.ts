import nodemailer, { Transporter } from "nodemailer"

type EmailPayload = {
  to: string
  subject: string
  html: string
}

type EmailSendResult = string; 

// Replace with your SMTP credentials
const smtpOptions = {
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER || "user",
    pass: process.env.SMTP_PASSWORD || "password",
  },
}


export const transporter = nodemailer.createTransport({
  ...smtpOptions,
})

export default async function sendEmail({ subject, html, to }: { subject: string, html: string, to: string }){
  const mailOptions = {
    from: process.env.SMTP_USER,
    to, // The person you want your email to be sent
    subject,
    html,
    // You can also add in HTML if you dont want plain text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err)
        return reject('Unable to send email')
      }

      const message = `Message delivered to ${info.accepted}`;
      console.error(message)
      return resolve(message);
    })
  });
}