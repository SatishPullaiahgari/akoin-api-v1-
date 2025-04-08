import { Response } from 'express';
import { WalletModel } from '../model/wallet.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const getUserWalletsOnly = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(400).json({ message: 'Unauthorized: user_id not found in token' });
    }

    const wallets = await WalletModel.find({ user_id }).select(
      '-_id wallet_id wallet_name wallet_type location_name latitude longitude balance'
    );

    return res.status(200).json({ wallets });
  } catch (error: any) {
    console.error('Error fetching wallets:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
