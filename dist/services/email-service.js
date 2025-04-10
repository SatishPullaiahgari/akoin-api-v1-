"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendResetPasswordEmail = async (to, username, newPassword) => {
    const testAccount = await nodemailer_1.default.createTestAccount();
    const transporter = nodemailer_1.default.createTransport({
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
    console.log("📬 Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
};
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=email-service.js.map