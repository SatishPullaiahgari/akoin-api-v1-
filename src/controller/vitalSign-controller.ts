import { Request, Response } from 'express';
import mongoose, { Schema, model } from 'mongoose';

// ✅ Define Schema
const VitalSignsSchema = new Schema({
  heart_rate: { type: Number, required: true },
  breath_rate: { type: Number, required: true },
  created_at: { type: Date, required: true, default: Date.now }
});

const VitalSignsModel = model('VitalSigns', VitalSignsSchema);

// ✅ Utility functions
const calculateAverage = (arr: number[]): number =>
  arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;

const formatDate = (date: Date): string => {
  if (!date) return 'N/A';
  try {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
    return new Date(date).toLocaleString('en-IN', options);
  } catch (err) {
    console.error('[formatDate error]', err);
    return 'N/A';
  }
};

//
// ✅ POST API — Save a single heartRate + breathRate
//
export const createVitalSigns = async (req: Request, res: Response): Promise<any> => {
  try {
    const { heartRate, breathRate, createdAt } = req.body;

    if (typeof heartRate !== 'number' || typeof breathRate !== 'number' || !createdAt) {
      return res.status(400).json({
        message: 'heartRate, breathRate, and createdAt are required fields.'
      });
    }

    const saved = await VitalSignsModel.create({
      heart_rate: heartRate,
      breath_rate: breathRate,
      created_at: createdAt
    });

    return res.status(201).json({
      message: 'health records saved  successfully.',
      data: {
        heartRate: saved.heart_rate,
        breathRate: saved.breath_rate,
        takenAt: formatDate(saved.created_at)
      }
    });
  } catch (err) {
    console.error('[createVitalSigns]', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


//
// ✅ GET API — Fetch last 7 heart & breath readings
//
export const getRecentVitalSigns = async (req: Request, res: Response): Promise<any> => {
  try {
    // Fetch latest 7 records
    const recentVitals = await VitalSignsModel.find({})
      .sort({ created_at: -1 })
      .limit(7)
      .lean();

    if (!recentVitals.length) {
      return res.status(404).json({ message: 'No data found.' });
    }

    // Reverse to oldest-first order
    const ordered = recentVitals.reverse();

    const heartRates = ordered.map((doc) => doc.heart_rate);
    const breathRates = ordered.map((doc) => doc.breath_rate);
    const timestamps = ordered.map((doc) => formatDate(doc.created_at));

    return res.status(200).json({
      heartRate: {
        readings: heartRates,
        takenAt: timestamps,
        avgOfLast7Readings: calculateAverage(heartRates)
      },
      breathRate: {
        readings: breathRates,
        takenAt: timestamps,
        avgOfLast7Readings: calculateAverage(breathRates)
      }
    });
  } catch (err) {
    console.error('[getRecentVitalSigns]', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
