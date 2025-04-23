import { Request, Response } from 'express';
import { BreathRateModel } from '../model/breathe-rate';

export const getUserBreathRates = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.body;

  try {
    const breathRatesData = await BreathRateModel.find({ user_id })
      .sort({ recordedAt: -1 })
      .limit(10);

    const breathRates: number[] = [];
    const dateTimes: string[] = [];

    breathRatesData.forEach((record) => {
      const date = new Date(record.recordedAt);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      breathRates.push(record.breathRate);
      dateTimes.push(`${day}, ${month} (${hours}:${minutes})`);
    });

    res.status(200).json({
      user_id,
      breathRates,
      dateTimes,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
