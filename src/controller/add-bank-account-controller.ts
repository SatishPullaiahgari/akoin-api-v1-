
import { Request, Response } from 'express';
import { BankAccountModel } from '../model/add-bank-account';

export const addBankAccount = async (req: Request, res: Response):Promise<any> => {
  const { bank_name, account_number, ifsc_code, account_holder_name } = req.body;
  const user_id = (req as any).user?.user_id;
  console.log("user_id", user_id);

  if (!bank_name || !account_number || !ifsc_code || !account_holder_name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newBank = await BankAccountModel.create({
    user_id,
    bank_name,
    account_number,
    ifsc_code,
    account_holder_name,
  });

  console.log("Authenticated User:", (req as any).user);

  res.status(200).json({
    message: 'Bank account added successfully',
    bankAccount: newBank,
  });
};
