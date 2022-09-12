import nodemailer, { SendMailOptions } from 'nodemailer';

import env from '../env/variables-env';
import logger from '../../config/loggers/logger';

const smtp = env.smtp;

const transporter = nodemailer.createTransport({ ...smtp, auth: { user: smtp.user, pass: smtp.pass } });

// async function createTestCreds(): Promise<void> {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }

// void createTestCreds();

async function sendEmail(payload: SendMailOptions): Promise<void> {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      logger.error(`Error sending the email: ${err.message}`);
    }

    logger.info(`Preview url: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
