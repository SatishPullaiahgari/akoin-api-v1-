"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWalletsOnly = void 0;
const wallet_model_1 = require("../model/wallet.model");
const getUserWalletsOnly = async (req, res) => {
    try {
        const user_id = req.user?.user_id;
        if (!user_id) {
            return res.status(400).json({ message: 'Unauthorized: user_id not found in token' });
        }
        const wallets = await wallet_model_1.WalletModel.find({ user_id }).select('-_id wallet_id wallet_name wallet_type location_name latitude longitude balance');
        return res.status(200).json({ wallets });
    }
    catch (error) {
        console.error('Error fetching wallets:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
exports.getUserWalletsOnly = getUserWalletsOnly;
//# sourceMappingURL=wallets-controller.js.map