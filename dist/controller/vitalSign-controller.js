"use strict";
// import { Request, Response } from 'express';
// import mongoose, { Schema, model } from 'mongoose';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentVitalSigns = exports.createVitalSigns = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
// ✅ Define Schema
const VitalSignsSchema = new mongoose_1.Schema({
    heart_rate: { type: Number, required: true },
    breath_rate: { type: Number, required: true },
    created_at: { type: String, required: true }, // Raw timestamp as received from frontend
    unique_id: { type: String, required: true } // Unique ID generated for sorting
});
const VitalSignsModel = (0, mongoose_1.model)('VitalSigns', VitalSignsSchema);
// ✅ Utility functions
const calculateAverage = (arr) => arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
// ✅ Round off function for heartRate and breathRate
const roundValue = (value) => Math.round(value);
// ✅ Generate a unique ID based on timestamp
const generateUniqueId = (createdAt) => {
    const timestamp = new Date(createdAt).getTime(); // Convert timestamp string to a number
    return `${timestamp}-${(0, uuid_1.v4)()}`; // Combine timestamp and a random UUID for uniqueness
};
// ✅ POST API — Save a single heartRate + breathRate
const createVitalSigns = async (req, res) => {
    try {
        const { heartRate, breathRate, createdAt } = req.body;
        if (typeof heartRate !== 'number' || typeof breathRate !== 'number' || !createdAt) {
            return res.status(400).json({
                message: 'heartRate, breathRate, and createdAt are required fields.'
            });
        }
        // Round the values before saving
        const roundedHeartRate = roundValue(heartRate);
        const roundedBreathRate = roundValue(breathRate);
        // Generate a unique ID for sorting
        const uniqueId = generateUniqueId(createdAt);
        const saved = await VitalSignsModel.create({
            heart_rate: roundedHeartRate,
            breath_rate: roundedBreathRate,
            created_at: createdAt, // Save the raw string timestamp from frontend
            unique_id: uniqueId // Store generated unique ID
        });
        return res.status(201).json({
            message: 'Health record saved successfully.',
            data: {
                heartRate: saved.heart_rate,
                breathRate: saved.breath_rate,
                takenAt: saved.created_at, // Return the exact timestamp
                uniqueId: saved.unique_id // Return the generated unique ID
            }
        });
    }
    catch (err) {
        console.error('[createVitalSigns]', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.createVitalSigns = createVitalSigns;
// ✅ GET API — Fetch last 7 heart & breath readings
const getRecentVitalSigns = async (req, res) => {
    try {
        // Fetch the most recent 7 records sorted by the unique ID
        const recentVitals = await VitalSignsModel.find({})
            .sort({ unique_id: -1 }) // Sort by the unique ID in descending order (latest first)
            .limit(7)
            .lean();
        // Get the heartRates, breathRates, and timestamps (return the raw created_at from DB)
        const heartRates = recentVitals.map((doc) => doc.heart_rate);
        const breathRates = recentVitals.map((doc) => doc.breath_rate);
        const timestamps = recentVitals.map((doc) => doc.created_at); // Raw timestamps
        return res.status(200).json({
            heartRate: {
                readings: heartRates,
                takenAt: timestamps, // Raw timestamps from DB
                avgOfLast7Readings: calculateAverage(heartRates)
            },
            breathRate: {
                readings: breathRates,
                takenAt: timestamps, // Raw timestamps from DB
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