
import nodemailer, { Transporter } from 'nodemailer'

export class EmailService {
  private transporter: Transporter;

  constructor(
      mailerService: string,
      mailerEmail: string,
      senderEmailPassword: string
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword
      }
    })
  }

  async sendEmail( options: any ) {

  }

}