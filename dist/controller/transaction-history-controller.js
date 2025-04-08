"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionHistory = void 0;
const trasanctionModel_1 = require("../model/trasanctionModel");
const getTransactionHistory = async (req, res) => {
    try {
        const user_id = req.user?.user_id;
        if (!user_id) {
            return res.status(400).json({ message: 'Unauthorized: user_id not found in token' });
        }
        const transactions = await trasanctionModel_1.TransactionModel.find({ user_id }).sort({ createdAt: -1 });
        const formatted = transactions.map((txn) => ({
            transaction_id: txn._id,
            user_id: txn.user_id,
            type: txn.type,
            amount: txn.amount,
            description: txn.description,
            wallet_id: txn.wallet_id,
            createdAt: txn.createdAt,
        }));
        res.status(200).json({ transactions: formatted });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching transaction history',
            error: error.message,
        });
    }
};
exports.getTransactionHistory = getTransactionHistory;
//# sourceMappingURL=transaction-history-controller.js.map