import { Request, Response } from 'express';
import { BreathRateModel } from '../model/breathe-rate';

export const postBreathRate = async (req: Request, res: Response) => {
  const { user_id, breathRate } = req.body;

  try {
    const newRecord = new BreathRateModel({ user_id, breathRate });
    await newRecord.save();

    res.status(201).json({ message: 'Breath rate recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
