import nodeMailer from "nodemailer";

import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_PROVIDER, MAIL_USER } from "../env/env.service.js";
import { print } from "../logger/print.service.js";

const transporter = nodeMailer.createTransport({
  service: MAIL_PROVIDER,
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail({
      from: `"Finella 👋" <${MAIL_USER}>`,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
      attachments: mailOptions.attachments,
    });
  } catch (error) {
    print("Error sending email", "error");
    throw error;
  }
};

export { sendMail };

