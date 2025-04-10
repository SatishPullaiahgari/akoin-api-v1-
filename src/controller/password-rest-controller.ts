import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../model/usermodel";
import { sendResetPasswordEmail } from "../services/email-service";

export const passwordReset = async (req:Request, res:Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
 
    console.log("Request Body", user);
    if (!user) {
      return res.status(400).json({ message: "username or email is not found to update password" });
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "Password must be a new password" });
    }
    console.log("Request body:", req.body);

    const hasedPassword = await bcrypt.hash(password, 10);
    user.password = hasedPassword;
    await user.save();
    await sendResetPasswordEmail(user.email, user.username, password);

    res.status(200).json({ message: "Password reset successfully completed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
