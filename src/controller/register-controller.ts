import { Request, Response } from 'express';
import { generateToken } from '../utilities/generate-token';
import { generateNextUserId } from '../utilities/generate-id';
import { RegisterModel } from '../model/registerShema';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;

  try {
    const existing = await RegisterModel.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user_id = await generateNextUserId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RegisterModel({
      user_id,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();


    const token = generateToken({
      user_id: newUser.user_id,
      email: newUser.email,
      username: newUser.username
    });

    res.status(200).json({ message: 'User registered', token:`Bearer ${token}`, user_id });
  } catch (error) {
    console.error("Unable to register user:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
