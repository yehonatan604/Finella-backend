import nodeMailer from "nodemailer";

import { MAIL_PROVIDER, MAIL_PORT, MAIL_HOST, MAIL_USER, MAIL_PASS } from "../../common/services/env/env.service.js";
import { print } from "../../common/services/logger/print.service.js";

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
      from: MAIL_USER,
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
