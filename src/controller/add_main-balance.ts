import { Response } from 'express';
import { MainBalanceModel } from '../model/main-blanance-model';
import { TransactionModel } from '../model/trasanctionModel';
import { AuthRequest } from '../middleware/auth.middleware'; 

export const addOrUpdateMainBalance = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const user_id = req.user?.user_id; 
    const { amount } = req.body;

    if (!user_id || typeof amount !== 'number') {
      return res.status(400).json({ message: 'user_id and amount are required' });
    }

    let userBalance = await MainBalanceModel.findOne({ user_id });

    if (userBalance) {
      userBalance.main_balance += amount;
      await userBalance.save();
    } else {
      userBalance = await MainBalanceModel.create({
        user_id,
        main_balance: amount,
      });
    }

    await TransactionModel.create({
      user_id,
      type: 'income',
      amount,
      description: 'Main balance top-up',
    });

    return res.status(200).json({
      message: 'Main balance updated successfully',
      data: userBalance,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Main balance already exists for this user_id' });
    }

    return res.status(500).json({
      message: 'Error updating main balance',
      error: error.message || error,
    });
  }
};
