import { Request, Response } from 'express';
import { MainBalanceModel } from '../model/main-blanance-model';
import { WalletModel } from '../model/wallet.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const getDashboardData = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(400).json({ message: 'Unauthorized: user_id not found in token' });
    }

    const mainBalanceDoc = await MainBalanceModel.findOne({ user_id });
    if (!mainBalanceDoc) {
      return res.status(404).json({ message: 'User main balance not found' });
    }

    const main_balance = mainBalanceDoc.main_balance;

    const incomeAgg = await MainBalanceModel.aggregate([
      { $match: { user_id } },
      { $group: { _id: null, totalIncome: { $sum: '$main_balance' } } }
    ]);
    const total_income = incomeAgg[0]?.totalIncome || 0;

    const spentAgg = await WalletModel.aggregate([
      { $match: { user_id } },
      { $group: { _id: null, totalSpent: { $sum: '$balance' } } }
    ]);
    const total_spent = spentAgg[0]?.totalSpent || 0;

    return res.status(200).json({
      status: main_balance > 0 ? 'success' : 'please add main balance',
      main_balance,
      total_income,
      total_spent
    });

  } catch (error: any) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
