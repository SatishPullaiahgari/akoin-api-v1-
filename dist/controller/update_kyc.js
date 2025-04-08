"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKyc = void 0;
const registerShema_1 = require("../model/registerShema");
const updateKyc = async (req, res, next) => {
    const user_id = req.user?.user_id;
    if (!user_id) {
        return res.status(400).json({ message: 'Unauthorized: user_id not found in token' });
    }
    try {
        const updateStatus = await registerShema_1.RegisterModel.findOneAndUpdate({ user_id: user_id }, { isKycPending: false }, { new: true });
        if (!updateStatus) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User KYC updated successfully!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateKyc = updateKyc;
//# sourceMappingURL=update_kyc.js.map