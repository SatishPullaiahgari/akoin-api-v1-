"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWalletId = void 0;
const counterwalletId_1 = require("../model/counterwalletId");
const generateWalletId = async () => {
    await counterwalletId_1.WalletCounterModel.updateOne({ name: 'wallet_id' }, {
        $inc: { seq: 1 },
        $setOnInsert: { name: 'wallet_id' },
    }, { upsert: true });
    const counter = await counterwalletId_1.WalletCounterModel.findOne({ name: 'wallet_id' });
    if (!counter) {
        throw new Error('Failed to generate wallet ID');
    }
    const padded = counter.seq.toString().padStart(6, '0');
    return `WALLET${padded}`;
};
exports.generateWalletId = generateWalletId;
//# sourceMappingURL=wallet-id.js.map