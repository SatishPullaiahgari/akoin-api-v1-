"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBankAccounts = void 0;
const add_bank_account_1 = require("../model/add-bank-account");
const getAllBankAccounts = async (req, res) => {
    const userId = req.user?.user_id;
    try {
        const bankAccounts = await add_bank_account_1.BankAccountModel.find({ user_id: userId });
        if (!bankAccounts || bankAccounts.length === 0) {
            return res.status(404).json({ message: "No bank accounts found for this user." });
        }
        res.status(200).json({ bankAccounts });
    }
    catch (error) {
        console.error("Error fetching bank accounts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllBankAccounts = getAllBankAccounts;
//# sourceMappingURL=get-all-bankaccounts.js.map