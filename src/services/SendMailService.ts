import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

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

  async execute(to: string, subject: string, variables: object, path: string) {
    let message: any
    const templateFileContent = fs.readFileSync(path).toString('utf8')
    const mailTemplateParse = handlebars.compile(templateFileContent)
    const html = mailTemplateParse(variables)

    try {
      message = await this.client.sendMail({
        to,
        subject,
        html,
        from: 'NPS <noreply@nps.com.br>'
      })
    } catch (error) { console.log(error) }

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendMailService()