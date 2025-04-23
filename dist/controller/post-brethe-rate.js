"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBreathRate = void 0;
const breathe_rate_1 = require("../model/breathe-rate");
const postBreathRate = async (req, res) => {
    const { user_id, breathRate } = req.body;
    try {
        const newRecord = new breathe_rate_1.BreathRateModel({ user_id, breathRate });
        await newRecord.save();
        res.status(201).json({ message: 'Breath rate recorded successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
exports.postBreathRate = postBreathRate;
//# sourceMappingURL=post-brethe-rate.js.map