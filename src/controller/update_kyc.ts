import { Response, NextFunction } from 'express';
import { RegisterModel } from '../model/registerShema';
import { AuthRequest } from '../middleware/auth.middleware';

export const updateKyc = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  const user_id = req.user?.user_id;

  if (!user_id) {
    return res.status(400).json({ message: 'Unauthorized: user_id not found in token' });
  }

  try {
    const updateStatus = await RegisterModel.findOneAndUpdate(
      { user_id: user_id },
      { isKycPending: false },
      { new: true }
    );

    if (!updateStatus) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User KYC updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
