"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrUpdateMainBalance = void 0;
const main_blanance_model_1 = require("../model/main-blanance-model");
const trasanctionModel_1 = require("../model/trasanctionModel");
const addOrUpdateMainBalance = async (req, res) => {
    try {
        const user_id = req.user?.user_id;
        const { amount } = req.body;
        if (!user_id || typeof amount !== 'number') {
            return res.status(400).json({ message: 'user_id and amount are required' });
        }
        let userBalance = await main_blanance_model_1.MainBalanceModel.findOne({ user_id });
        if (userBalance) {
            userBalance.main_balance += amount;
            await userBalance.save();
        }
        else {
            userBalance = await main_blanance_model_1.MainBalanceModel.create({
                user_id,
                main_balance: amount,
            });
        }
        await trasanctionModel_1.TransactionModel.create({
            user_id,
            type: 'income',
            amount,
            description: 'Main balance top-up',
        });
        return res.status(200).json({
            message: 'Main balance updated successfully',
            data: userBalance,
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Main balance already exists for this user_id' });
        }
        return res.status(500).json({
            message: 'Error updating main balance',
            error: error.message || error,
        });
    }
};
exports.addOrUpdateMainBalance = addOrUpdateMainBalance;
//# sourceMappingURL=add_main-balance.js.map