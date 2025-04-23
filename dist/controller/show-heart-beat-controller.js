"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHeartBeats = void 0;
const heart_beatModel_1 = require("../model/heart-beatModel");
const getUserHeartBeats = async (req, res) => {
    const { user_id } = req.body;
    try {
        const heartBeats = await heart_beatModel_1.HeartBeatModel.find({ user_id })
            .sort({ recordedAt: -1 })
            .limit(10);
        const heartRates = [];
        const dateTimes = [];
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
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
exports.getUserHeartBeats = getUserHeartBeats;
//# sourceMappingURL=show-heart-beat-controller.js.map