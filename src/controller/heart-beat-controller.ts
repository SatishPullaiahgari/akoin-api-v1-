// controller/heartBeatController.ts
import { Request, Response } from 'express';
import { HeartBeatModel } from '../model/heart-beatModel';

export const postHeartBeat = async (req: Request, res: Response):Promise<any> => {
  const { user_id, heartRate } = req.body;

  if (!user_id || !heartRate) {
    return res.status(400).json({ message: "user_id and heartRate are required" });
  }

  try {
    const newRecord = new HeartBeatModel({ user_id, heartRate });
    await newRecord.save();
    res.status(200).json({ message: "Heart rate recorded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to record heart rate", error });
  }
};
