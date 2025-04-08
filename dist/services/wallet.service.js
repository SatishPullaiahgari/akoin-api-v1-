"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletService = void 0;
const wallet_model_1 = require("../model/wallet.model");
const main_blanance_model_1 = require("../model/main-blanance-model");
const wallet_id_1 = require("../utilities/wallet-id");
const trasanctionModel_1 = require("../model/trasanctionModel");
const createWalletService = async (payload) => {
    const { user_id, wallet_name, wallet_type, location_name, latitude, longitude, amount, } = payload;
    const userBalance = await main_blanance_model_1.MainBalanceModel.findOne({ user_id });
    if (!userBalance)
        throw new Error('User balance record not found');
    if (userBalance.main_balance < amount) {
        throw new Error('Insufficient main balance');
    }
    const existingWallet = await wallet_model_1.WalletModel.findOne({ user_id, wallet_name });
    if (existingWallet) {
        throw new Error('Wallet with this name already exists for this user');
    }
    const wallet_id = await (0, wallet_id_1.generateWalletId)();
    userBalance.main_balance -= amount;
    await userBalance.save();
    const wallet = await wallet_model_1.WalletModel.create({
        wallet_id,
        user_id,
        wallet_name,
        wallet_type,
        location_name,
        latitude,
        longitude,
        balance: amount,
    });
    await trasanctionModel_1.TransactionModel.create({
        user_id,
        type: 'expense',
        amount,
        description: `Wallet created: ${wallet_name}`,
        wallet_id: wallet_id
    });
    return {
        message: 'Wallet created successfully',
        wallet_id: wallet_id,
        wallet_name: wallet_name,
        wallet_type: wallet_type,
    };
};
exports.createWalletService = createWalletService;
//# sourceMappingURL=wallet.service.js.map