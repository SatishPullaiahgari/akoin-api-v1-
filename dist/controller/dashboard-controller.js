"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const main_blanance_model_1 = require("../model/main-blanance-model");
const wallet_model_1 = require("../model/wallet.model");
const getDashboardData = async (req, res) => {
    try {
        const user_id = req.user?.user_id;
        if (!user_id) {
            return res.status(400).json({ message: 'Unauthorized: user_id not found in token' });
        }
        const mainBalanceDoc = await main_blanance_model_1.MainBalanceModel.findOne({ user_id });
        if (!mainBalanceDoc) {
            return res.status(404).json({ message: 'User main balance not found' });
        }
        const main_balance = mainBalanceDoc.main_balance;
        const incomeAgg = await main_blanance_model_1.MainBalanceModel.aggregate([
            { $match: { user_id } },
            { $group: { _id: null, totalIncome: { $sum: '$main_balance' } } }
        ]);
        const total_income = incomeAgg[0]?.totalIncome || 0;
        const spentAgg = await wallet_model_1.WalletModel.aggregate([
            { $match: { user_id } },
            { $group: { _id: null, totalSpent: { $sum: '$balance' } } }
        ]);
        const total_spent = spentAgg[0]?.totalSpent || 0;
        return res.status(200).json({
            status: main_balance > 0 ? 'success' : 'please add main balance',
            main_balance,
            total_income,
            total_spent
        });
    }
    catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
exports.getDashboardData = getDashboardData;
//# sourceMappingURL=dashboard-controller.js.map