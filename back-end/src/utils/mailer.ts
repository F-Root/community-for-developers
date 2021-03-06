import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { AppError } from "../middlewares";

async function authMailer(email: string, authNumber: number) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.MAILER_ID,
      pass: process.env.MAILER_PW,
    },
    from: process.env.MAILER_ID,
  });

  try {
    const info = await transporter.sendMail({
      from: `CFD Team <${process.env.MAILER_ID}>`,
      to: email,
      subject: "이메일 인증번호 입니다",
      html: `<p style="font-size: 16px;">인증번호 : ${authNumber}</p>`,
    });

    console.log(info);
  } catch (error) {
    throw new AppError(500, "메일 발송을 실패했습니다.", (<Error>error).name);
  }
}
export { authMailer };
