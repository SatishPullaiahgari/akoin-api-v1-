import { Request, Response } from "express";
import { LoginModel } from "../model/loginSchema";
import { generateToken } from "../utilities/generate-token";
import { MainBalanceModel } from "../model/main-blanance-model";

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, username, password } = req.body;
  const identifier = email || username;

  try {
    if (!identifier || !password) {
      return res.status(400).json({ message: "Username/email and password are required" });
    }

    console.log("Identifier:", identifier); // Debug

    const user = await LoginModel.findOne({
      $or: [
        { email: { $regex: new RegExp(`^${identifier}$`, "i") } },
        { username: { $regex: new RegExp(`^${identifier}$`, "i") } },
      ],
    });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or username" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user.user_id);
    const wallet = await MainBalanceModel.findOne({ user_id: user.user_id });
    res.status(200).json({
      message: "Login successful",
      token: `Bearer ${token}`,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        isKycPending: user.isKycPending,
        main_balance: wallet?.main_balance || 0, 
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
