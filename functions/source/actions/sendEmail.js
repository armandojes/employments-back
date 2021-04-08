import { log } from 'firebase-functions/lib/logger'
import nodemailer from 'nodemailer'
import { emailAcount } from '../../constants'

/**
 * send email
 * @param {String} email email to send
 * @param {String} subject email title
 * @param {String} html email content in html
 */
const sendEmail = (email, subject, html) => {
  log('email, subject', email, subject)
  const transporter = nodemailer.createTransport(emailAcount.transporter)
  return transporter.sendMail({
    from: emailAcount.email,
    to: email,
    subject: subject,
    html: html
  })
}

export default sendEmail
