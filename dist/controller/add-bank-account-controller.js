"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBankAccount = void 0;
const add_bank_account_1 = require("../model/add-bank-account");
const addBankAccount = async (req, res) => {
    const { bank_name, account_number, ifsc_code, account_holder_name } = req.body;
    const user_id = req.user?.user_id;
    console.log("user_id", user_id);
    if (!bank_name || !account_number || !ifsc_code || !account_holder_name) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newBank = await add_bank_account_1.BankAccountModel.create({
        user_id,
        bank_name,
        account_number,
        ifsc_code,
        account_holder_name,
    });
    console.log("Authenticated User:", req.user);
    res.status(200).json({
        message: 'Bank account added successfully',
        bankAccount: newBank,
    });
};
exports.addBankAccount = addBankAccount;
//# sourceMappingURL=add-bank-account-controller.js.map