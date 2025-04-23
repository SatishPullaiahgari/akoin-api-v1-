"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBreathRates = void 0;
const breathe_rate_1 = require("../model/breathe-rate");
const getUserBreathRates = async (req, res) => {
    const { user_id } = req.body;
    try {
        const breathRatesData = await breathe_rate_1.BreathRateModel.find({ user_id })
            .sort({ recordedAt: -1 })
            .limit(10);
        const breathRates = [];
        const dateTimes = [];
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
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
exports.getUserBreathRates = getUserBreathRates;
//# sourceMappingURL=get-breathe-rate.js.map