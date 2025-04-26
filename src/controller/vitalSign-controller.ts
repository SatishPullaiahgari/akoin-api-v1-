import { Request, Response } from 'express';
import mongoose, { Schema, model } from 'mongoose';

// ✅ Define Schema
const VitalSignsSchema = new Schema({
  heart_rate: { type: Number, required: true },
  breath_rate: { type: Number, required: true },
  created_at: { type: String, required: true }  // Storing as string now
});

const VitalSignsModel = model('VitalSigns', VitalSignsSchema);

// ✅ Utility functions
const calculateAverage = (arr: number[]): number =>
  arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;

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

    // Save createdAt as a string directly
    // const createdDate = new Date(createdAt).toString(); // Save as string in the DB

    const saved = await VitalSignsModel.create({
      heart_rate: heartRate,
      breath_rate: breathRate,
      created_at: createdAt
    });

    return res.status(201).json({
      message: 'Health record saved successfully.',
      data: {
        heartRate: saved.heart_rate,
        breathRate: saved.breath_rate,
        takenAt: saved.created_at  // Send the raw string back to the frontend
      }
    });
  } catch (err) {
    console.error('[createVitalSigns]', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// ✅ GET API — Fetch last 7 heart & breath readings


export const getRecentVitalSigns = async (req: Request, res: Response): Promise<any> => {
  try {
   
    const recentVitals = await VitalSignsModel.find({})
    .sort({ created_at: -1 })  // Sort by latest date first
    .limit(7)  // Get only 7 records
    .lean();

  

    const heartRates = recentVitals.map((doc) => doc.heart_rate);
    const breathRates = recentVitals.map((doc) => doc.breath_rate);
    const timestamps = recentVitals.map((doc) => doc.created_at); 
     // Return the saved string timestamp

     console.log('time', timestamps)

    return res.status(200).json({
      heartRate: {
        readings: heartRates,
        takenAt: timestamps,  // Send the raw timestamps
        avgOfLast7Readings: calculateAverage(heartRates)
      },
      breathRate: {
        readings: breathRates,
        takenAt: timestamps,  // Send the raw timestamps
        avgOfLast7Readings: calculateAverage(breathRates)
      }
    });
  } catch (err) {
    console.error('[getRecentVitalSigns]', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
