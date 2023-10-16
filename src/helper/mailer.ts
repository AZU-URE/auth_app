import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/model/userModel";

export default async function mailer({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        { _id: userId },
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
      );
    } else if (emailType === "FORGETPASSWORD") {
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      );
    }
    // adding transporter
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
    // adding mailer
    // const body = `Check out the link below or copy the link text and paste it in your browser<b>
    //     ${
    //       emailType === "VERIFY" ? (
    //
    //       ) :
    //     }<b>OR</b></br><h1>{${emailType} === "VERIFY" ? ${
    //   process.env.DOMAIN
    // }/verifyEmail?token=${hashedToken}</h1> : <h1>${
    //   process.env.DOMAIN
    // }/forgetPassword?token=${hashedToken}</h1>}`;
    // console.log(body);

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyEmail?token=${hashedToken}`
        : `${process.env.DOMAIN}/forgetPassword?token=${hashedToken}`;

    const mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verification Email" : "Reset Your Password", // Subject line
      html: `<a href=${link}>CLick Here</a></br><b>OR</b></br><p>Copy and paste this in your browser-></p><h1>${link}</h1>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
