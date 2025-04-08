import { Request, Response } from 'express';
import { createWalletService } from '../services/wallet.service';

export const createWallet = async (req: Request, res: Response):Promise<any> => {
  try {
    
    const result = await createWalletService(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};