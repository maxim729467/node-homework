const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

class VerificationEmailService {
  constructor(email, verifyToken) {
    this.email = email
    this.verifyToken = verifyToken
  }

  async sendVerificationEmail() {
    const messageTemplate = this.createTemplate()
    const msg = {
      to: this.email,
      subject: 'Thank you for your registration',
      from: 'maksym.shyshko@gmail.com',
      text: 'and easy to do anywhere, even with Node.js',
      html: messageTemplate
    }
    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error(error)
    }
  }

  createTemplate() {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: 'GoIT link',
        link: 'https://goit.ua/'
      }
    })

    const email = {
      body: {
        name: 'Bro',
        intro: 'I am glad to see you here!',
        action: {
          instructions: 'Click the button below to get started:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `http://localhost:7777/users/verify/${this.verifyToken}`
          }
        },
        outro: 'In case you\'ve got any questions, do not hesitate to reply to this email.'
      }
    }

    return mailGenerator.generate(email)
  }
}

module.exports = {
  VerificationEmailService
}
