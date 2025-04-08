"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = void 0;
const wallet_service_1 = require("../services/wallet.service");
const createWallet = async (req, res) => {
    try {
        const user_id = req.user?.user_id;
        if (!user_id) {
            return res.status(401).json({ message: 'Unauthorized: user_id missing in token' });
        }
        const payload = {
            ...req.body,
            user_id, // ✅ inject user_id from token
        };
        const result = await (0, wallet_service_1.createWalletService)(payload);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createWallet = createWallet;
//# sourceMappingURL=create-wallet.controller.js.map