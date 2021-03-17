import nodemailer, { Transporter } from 'nodemailer'

class SendMailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch(error => console.log(error))
  }

  async execute(to: string, subject: string, body: string) {
    let message: any

    try {
      message = await this.client.sendMail({
        to,
        subject,
        html: body,
        from: 'NPS <noreply@nps.com.br>'
      })
    } catch (error) { console.log(error) }

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendMailService()