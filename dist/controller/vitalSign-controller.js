"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentVitalSigns = exports.createVitalSigns = void 0;
const mongoose_1 = require("mongoose");
// Define schema
const VitalSignsSchema = new mongoose_1.Schema({
    patient_id: { type: String, required: true },
    resting_heart_rate: { type: [Number], required: true },
    performance_heart_rate: { type: [Number], required: true },
    recorded_at: { type: Date, default: Date.now }
});
const VitalSignsModel = (0, mongoose_1.model)('VitalSigns', VitalSignsSchema);
// Utility functions
const calculateAverage = (arr) => arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
const formatDate = (date) => {
    if (!date)
        return 'N/A';
    try {
        const options = {
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        };
        return new Date(date).toLocaleString('en-IN', options); // Simplified, no split or regex needed
    }
    catch (err) {
        console.error('[formatDate error]', err);
        return 'N/A';
    }
};
// ✅ POST API — Save 20 readings
const createVitalSigns = async (req, res) => {
    try {
        const patient_id = 'PAT000002';
        const { resting_heart_rate, performance_heart_rate } = req.body;
        if (!Array.isArray(resting_heart_rate) || resting_heart_rate.length !== 20 ||
            !Array.isArray(performance_heart_rate) || performance_heart_rate.length !== 20) {
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
    }
    catch (err) {
        console.error('[createVitalSigns]', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.createVitalSigns = createVitalSigns;


// ✅ GET API — Last 7 readings from latest document
const getRecentVitalSigns = async (req, res) => {
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
    
        const ordered = recentVitals.reverse();
       
        const restingValues = ordered.map((doc) => doc.resting_heart_rate[doc.resting_heart_rate.length - 1]); 
        const performanceValues = ordered.map((doc) => doc.performance_heart_rate[doc.performance_heart_rate.length - 1]);
      
        const recordedAtTimestamps = ordered.map((doc) => {
            const formattedDate = formatDate(doc.recorded_at);
            return formattedDate === 'N/A' ? 'Unknown Time' : formattedDate;
        });
        const avg = (arr) => arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
        return res.status(200).json({
            message: 'Last 7 heart rate readings fetched.',
            data: {
                resting_heart_data: {
                    data: restingValues,
                    time: recordedAtTimestamps, 
                    average: avg(restingValues),
                },
                performance_heart_data: {
                    data: performanceValues,
                    time: recordedAtTimestamps, 
                    average: avg(performanceValues),
                },
            },
        });
    }
    catch (error) {
        console.error('[getRecentVitalSigns]', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getRecentVitalSigns = getRecentVitalSigns;
//# sourceMappingURL=vitalSign-controller.js.map