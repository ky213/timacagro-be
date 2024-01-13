import { Injectable, InjectionToken, Provider } from "graphql-modules";
import { Transporter, createTransport, getTestMessageUrl } from "nodemailer";

import { emailServerOptions } from "config/email-server";

export interface IEmailService {
  getEmailServer(): Transporter;
  send(from: string, to: string, subject: string, content: string): void;
}

@Injectable()
export class EmailService implements IEmailService {
  private readonly emailServer: Transporter;

  constructor() {
    this.emailServer = createTransport(emailServerOptions);
  }

  public getEmailServer() {
    return this.emailServer;
  }

  async send(from: string, to: string, subject: string, content: string) {
    this.emailServer.sendMail(
      {
        from,
        to,
        subject,
        html: content,
      },
      (err, info) => {
        if (err) {
          console.log("Error sending email. " + err.message);
        }

        console.log("Email sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", getTestMessageUrl(info));
      }
    );
  }
}

export const EmailServiceToken = new InjectionToken<IEmailService>("EmailService");

export const EmailServiceProvider: Provider<IEmailService> = {
  provide: EmailServiceToken,
  useFactory: () => new EmailService(),
};
