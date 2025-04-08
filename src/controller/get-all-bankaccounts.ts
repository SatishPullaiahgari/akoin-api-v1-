import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware'; 
import { BankAccountModel } from '../model/add-bank-account';

export const getAllBankAccounts = async (req: AuthRequest, res: Response): Promise<any> => {
  const userId = req.user?.user_id;

  try {
    const bankAccounts = await BankAccountModel.find({ user_id: userId });

    if (!bankAccounts || bankAccounts.length === 0) {
      return res.status(404).json({ message: "No bank accounts found for this user." });
    }

    res.status(200).json({ bankAccounts });
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
