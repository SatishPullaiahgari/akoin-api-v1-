import nodemailer from 'nodemailer';

export const sendResetPasswordEmail = async (to: string, username: string, newPassword: string) => {

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
  });

  const info = await transporter.sendMail({
    from: '"Akoin Support" <support@akoin.com>',
    to,
    subject: "Akoin Password Reset",
    html: `
      <h3>Password Reset Confirmation</h3>
      <p>Hello <b>${username}</b>,</p>
      <p>Your new password is: <b>${newPassword}</b></p>
      <p>If you didn’t request this change, please contact support immediately.</p>
    `,
  });

  console.log("📬 Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
