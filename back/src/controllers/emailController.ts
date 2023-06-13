import { Request, Response } from 'express';
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import { emailObject } from '../email/sendEmail';

import dotenv from 'dotenv';

dotenv.config();

const emailController = {
  sendEmail: async (req: Request, res: Response) => {
    try {
      const { destinatario } = req.body;

      if (!destinatario) {
        res.status(404).json({ error: 'Você precisa inserir o destinátario' });
        return;
      }

      const nomeDestinatario = destinatario.split('@')[0];

      const transporter: Transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.PASSWORD_APP,
        },
      });
      const emailOptions: SendMailOptions = {
        from: emailObject.from,
        to: destinatario,
        subject: emailObject.subject,
        text: emailObject.message,
        html: `
        <h1>Olá ${nomeDestinatario}</h1>
        <p>Vimos que você gostou de um dos nossos pets, vamos analisar o seu cadastro e logo entraremos em contato 😉</p>
        <img src="cid:unique@kreata.ee"/>`,
        attachments: [
          {
            filename: 'dionisiopet.png',
            path: 'src/images/dionisiopet.png',
            cid: 'unique@kreata.ee',
          },
        ],
      };
      await transporter.sendMail(emailOptions);
      res.status(200).json({ msg: 'E-mail enviado com sucesso.' });
      console.log('E-mail enviado com sucesso!');
    } catch (error) {
      res.status(500).json({ error: 'Erro em enviar o e-mail.' });
      console.log(error);
    }
  },
};

export default emailController;
