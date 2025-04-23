import { Request, Response } from 'express';
import mongoose, { Schema, model } from 'mongoose';

const VitalSignsSchema = new Schema({
  patient_id: { type: String, required: true },
  resting_heart_rate: { type: [Number], required: true }, // array of 20 numbers
  performance_heart_rate: { type: [Number], required: true }, // array of 20 numbers
  recorded_at: { type: Date, default: Date.now }
});

const VitalSignsModel = model('VitalSigns', VitalSignsSchema);

const calculateAverage = (arr: number[]): number =>
  arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;

// ✅ 3. POST API — Save 20 readings for both types
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

    const formatDateForPost = (date: Date) => new Date(date).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    }).replace(/(\d{2}) (\w{3}) (\d{4})/, '$1 $2, $3');

    return res.status(200).json({
      message: 'Vital signs recorded successfully.',
      average: {
        resting_heart_rate: calculateAverage(resting_heart_rate),
        performance_heart_rate: calculateAverage(performance_heart_rate)
      },
      data: {
        resting_heart_data: {
          data: resting_heart_rate,
          time: Array(resting_heart_rate.length).fill(formatDateForPost(saved.recorded_at)), // Same timestamp for all 20
          average: calculateAverage(resting_heart_rate)
        },
        performance_heart_data: {
          data: performance_heart_rate,
          time: Array(performance_heart_rate.length).fill(formatDateForPost(saved.recorded_at)), // Same timestamp for all 20
          average: calculateAverage(performance_heart_rate)
        }
      }
    });
  } catch (err) {
    console.error('[createVitalSigns]', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// ✅ 4. GET API — Get last 7 documents (optional)
export const getRecentVitalSigns = async (req: Request, res: Response): Promise<any> => {
  try {
    const patient_id = "PAT000002";

    const latestVital = await VitalSignsModel.findOne({ patient_id }).sort({ recorded_at: -1 });

    if (!latestVital) {
      return res.status(404).json({ message: 'No data found for this patient.' });
    }

    // Updated formatDate function to the desired format "Tue(11:29 PM)"
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'short', // Mon, Tue, etc.
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata' // Explicitly set the time zone to IST
        };
        const formattedDate = new Date(date).toLocaleString('en-US', options);
        const [day, time] = formattedDate.split(', ');
        return `${day}(${time.trim()})`; // Tue(11:29 PM) - trim whitespace
      };

    // Now, let's create an array of timestamps for the last 7 readings.
    // Since you are saving all 20 readings with the same recorded_at timestamp,
    // we will just format that single timestamp for all 7 entries.
    const formattedTimes = Array(7).fill(formatDate(latestVital.recorded_at));

    return res.status(200).json({
      message: 'Last 7 heart rate readings fetched from the latest record.',
      data: {
        resting_heart_data: {
          data: latestVital.resting_heart_rate.slice(-7),
          time: formattedTimes, // Use the formatted timestamp array
          average: calculateAverage(latestVital.resting_heart_rate.slice(-7))
        },
        performance_heart_data: {
          data: latestVital.performance_heart_rate.slice(-7),
          time: formattedTimes, // Use the formatted timestamp array
          average: calculateAverage(latestVital.performance_heart_rate.slice(-7))
        }
      }
    });
  } catch (error) {
    console.error('[getRecentVitalSigns]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};