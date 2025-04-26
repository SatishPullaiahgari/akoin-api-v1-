"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentVitalSigns = exports.createVitalSigns = void 0;
const mongoose_1 = require("mongoose");
// ✅ Define Schema
const VitalSignsSchema = new mongoose_1.Schema({
    heart_rate: { type: Number, required: true },
    breath_rate: { type: Number, required: true },
    created_at: { type: Date, required: true, default: Date.now }
});
const VitalSignsModel = (0, mongoose_1.model)('VitalSigns', VitalSignsSchema);
// ✅ Utility functions
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
        return new Date(date).toLocaleString('en-IN', options);
    }
    catch (err) {
        console.error('[formatDate error]', err);
        return 'N/A';
    }
};
//
// ✅ POST API — Save a single heartRate + breathRate
//
const createVitalSigns = async (req, res) => {
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
    }
    catch (err) {
        console.error('[createVitalSigns]', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.createVitalSigns = createVitalSigns;
//
// ✅ GET API — Fetch last 7 heart & breath readings
//
const getRecentVitalSigns = async (req, res) => {
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
    }
    catch (err) {
        console.error('[getRecentVitalSigns]', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getRecentVitalSigns = getRecentVitalSigns;
//# sourceMappingURL=vitalSign-controller.js.map