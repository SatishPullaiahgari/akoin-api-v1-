import { Request, Response } from 'express';
import { HeartBeatModel } from '../model/heart-beatModel';

export const getUserHeartBeats = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    const heartBeats = await HeartBeatModel.find({ user_id })
      .sort({ recordedAt: -1 }) 
      .limit(10); 

    const heartRates: number[] = [];
    const dateTimes: string[] = [];

    heartBeats.forEach((record) => {
      const date = new Date(record.recordedAt);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' }); 
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      heartRates.push(record.heartRate);
      dateTimes.push(`${day}, ${month} (${hours}:${minutes})`);
    });

    res.status(200).json({
      user_id,
      heartRates,
      dateTimes,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

