"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentVitalSigns = exports.createVitalSigns = void 0;
const mongoose_1 = require("mongoose");
// ✅ 1. Define the schema inside controller file
const VitalSignsSchema = new mongoose_1.Schema({
    patient_id: { type: String, required: true },
    resting_heart_rate: { type: [Number], required: true }, // array of 20 numbers
    performance_heart_rate: { type: [Number], required: true }, // array of 20 numbers
    recorded_at: { type: Date, default: Date.now }
});
const VitalSignsModel = (0, mongoose_1.model)('VitalSigns', VitalSignsSchema);
// ✅ 2. Average calculator
const calculateAverage = (arr) => arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
// ✅ 3. POST API — Save 20 readings for both types
const createVitalSigns = async (req, res) => {
    try {
        const patient_id = 'PAT000002'; // static for now, can be from req.body or token later
        const { resting_heart_rate, performance_heart_rate } = req.body;
        if (!Array.isArray(resting_heart_rate) || resting_heart_rate.length !== 20 ||
            !Array.isArray(performance_heart_rate) || performance_heart_rate.length !== 20) {
            return res.status(400).json({
                message: 'Exactly 20 readings for both heart rate types are required.'
            });
        }
        const restingAvg = calculateAverage(resting_heart_rate);
        const performanceAvg = calculateAverage(performance_heart_rate);
        // Save full array data in MongoDB
        const saved = await VitalSignsModel.create({
            patient_id,
            resting_heart_rate,
            performance_heart_rate
        });
        // Format timestamp label
        const timeLabel = new Date(saved.recorded_at).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(/(\d{2}) (\w{3}) (\d{4})/, '$1 $2, $3'); // Ex: 23 Apr, 2025
        return res.status(200).json({
            message: 'Vital signs recorded successfully.',
            average: {
                resting_heart_rate: restingAvg,
                performance_heart_rate: performanceAvg
            },
            data: {
                resting_heart_data: {
                    data: resting_heart_rate,
                    time: Array(20).fill(timeLabel),
                    average: restingAvg
                },
                performance_heart_data: {
                    data: performance_heart_rate,
                    time: Array(20).fill(timeLabel),
                    average: performanceAvg
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
// ✅ 4. GET API — Get last 7 documents (optional)
const getRecentVitalSigns = async (req, res) => {
    try {
        const { patient_id } = req.query;
        if (!patient_id) {
            return res.status(400).json({ message: 'patient_id is required' });
        }
        const vitals = await VitalSignsModel.find({ patient_id })
            .sort({ recorded_at: -1 })
            .limit(7);
        if (!vitals.length) {
            return res.status(404).json({ message: 'No data found for this patient.' });
        }
        const data = vitals.reverse().map(v => {
            const timeLabel = new Date(v.recorded_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(/(\d{2}) (\w{3}) (\d{4})/, '$1 $2, $3');
            return {
                resting_heart_data: {
                    data: v.resting_heart_rate,
                    time: Array(20).fill(timeLabel),
                    average: calculateAverage(v.resting_heart_rate)
                },
                performance_heart_data: {
                    data: v.performance_heart_rate,
                    time: Array(20).fill(timeLabel),
                    average: calculateAverage(v.performance_heart_rate)
                }
            };
        });
        return res.status(200).json({
            message: 'Last 7 vital sign entries fetched.',
            data
        });
    }
    catch (error) {
        console.error('[getRecentVitalSigns]', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getRecentVitalSigns = getRecentVitalSigns;
//# sourceMappingURL=vitalSign-controller.js.map