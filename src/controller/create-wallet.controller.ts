import { Response } from 'express';
import { createWalletService } from '../services/wallet.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const createWallet = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(401).json({ message: 'Unauthorized: user_id missing in token' });
    }

    const payload = {
      ...req.body,
      user_id, // ✅ inject user_id from token
    };

    const result = await createWalletService(payload);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
