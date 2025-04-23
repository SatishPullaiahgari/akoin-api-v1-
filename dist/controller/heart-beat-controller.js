"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHeartBeat = void 0;
const heart_beatModel_1 = require("../model/heart-beatModel");
const postHeartBeat = async (req, res) => {
    const { user_id, heartRate } = req.body;
    if (!user_id || !heartRate) {
        return res.status(400).json({ message: "user_id and heartRate are required" });
    }
    try {
        const newRecord = new heart_beatModel_1.HeartBeatModel({ user_id, heartRate });
        await newRecord.save();
        res.status(200).json({ message: "Heart rate recorded successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to record heart rate", error });
    }
};
exports.postHeartBeat = postHeartBeat;
//# sourceMappingURL=heart-beat-controller.js.map