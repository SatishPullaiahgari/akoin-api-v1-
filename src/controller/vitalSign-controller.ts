import { Request, Response } from 'express';
import mongoose, { Schema, model } from 'mongoose';

// Define schema
const VitalSignsSchema = new Schema({
  patient_id: { type: String, required: true },
  resting_heart_rate: { type: [Number], required: true },
  performance_heart_rate: { type: [Number], required: true },
  recorded_at: { type: Date, default: Date.now }
});

const VitalSignsModel = model('VitalSigns', VitalSignsSchema);

// Utility functions
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
  
      return new Date(date).toLocaleString('en-IN', options); // Simplified, no split or regex needed
    } catch (err) {
      console.error('[formatDate error]', err);
      return 'N/A';
    }
  };
  
  

// ✅ POST API — Save 20 readings
export const createVitalSigns = async (req: Request, res: Response): Promise<any> => {
  try {
    const patient_id = 'PAT000002';
    const { resting_heart_rate, performance_heart_rate } = req.body;

    if (
      !Array.isArray(resting_heart_rate) || resting_heart_rate.length !== 20 ||
      !Array.isArray(performance_heart_rate) || performance_heart_rate.length !== 20
    ) {
      return res.status(400).json({
        message: 'Exactly 20 readings for both heart rate types are required.'
      });
    }

    const saved = await VitalSignsModel.create({
      patient_id,
      resting_heart_rate,
      performance_heart_rate
    });

    const formattedTime = formatDate(saved.recorded_at);

    return res.status(200).json({
      message: 'Vital signs recorded successfully.',
      average: {
        resting_heart_rate: calculateAverage(resting_heart_rate),
        performance_heart_rate: calculateAverage(performance_heart_rate)
      },
      data: {
        resting_heart_data: {
          data: resting_heart_rate,
          time: resting_heart_rate.map(() => formattedTime),
          average: calculateAverage(resting_heart_rate)
        },
        performance_heart_data: {
          data: performance_heart_rate,
          time: performance_heart_rate.map(() => formattedTime),
          average: calculateAverage(performance_heart_rate)
        }
      }
    });
  } catch (err) {
    console.error('[createVitalSigns]', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ✅ GET API — Last 7 readings from latest document
// ✅ GET API — Last 7 readings from latest document
export const getRecentVitalSigns = async (req: Request, res: Response): Promise<any> => {
    try {
      const patient_id = "PAT000002";
  
      // Fetch the latest 7 records for this patient
      const recentVitals = await VitalSignsModel.find({ patient_id })
        .sort({ recorded_at: -1 })
        .limit(7)
        .lean();
  
      if (!recentVitals.length) {
        return res.status(404).json({ message: 'No data found for this patient.' });
      }
  
      // Reverse to show oldest records first
      const ordered = recentVitals.reverse();
  
      // Map the values for resting and performance heart rate and their recorded_at timestamps
      const restingValues = ordered.map((doc) => doc.resting_heart_rate[doc.resting_heart_rate.length - 1]); // Assuming 1 reading per entry
      const performanceValues = ordered.map((doc) => doc.performance_heart_rate[doc.performance_heart_rate.length - 1]);
      
      // Ensure 'recorded_at' exists and format it
      const recordedAtTimestamps = ordered.map((doc) => {
        const formattedDate = formatDate(doc.recorded_at);
        return formattedDate === 'N/A' ? 'Unknown Time' : formattedDate;
      });
  
      const avg = (arr: number[]) =>
        arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
  
      return res.status(200).json({
        message: 'Last 7 heart rate readings fetched.',
        data: {
          resting_heart_data: {
            data: restingValues,
            time: recordedAtTimestamps, // Send formatted timestamps
            average: avg(restingValues),
          },
          performance_heart_data: {
            data: performanceValues,
            time: recordedAtTimestamps, // Send formatted timestamps
            average: avg(performanceValues),
          },
        },
      });
    } catch (error) {
      console.error('[getRecentVitalSigns]', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  