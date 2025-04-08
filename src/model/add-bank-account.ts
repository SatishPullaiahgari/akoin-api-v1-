
import mongoose, { Schema, Document } from 'mongoose';

export interface IBankAccount extends Document {
  user_id: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  account_holder_name: string;
  createdAt: Date;
}

const BankAccountSchema = new Schema<IBankAccount>({
  user_id: { type: String, required: true },
  bank_name: { type: String, required: true },
  account_number: { type: String, required: true },
  ifsc_code: { type: String, required: true },
  account_holder_name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const BankAccountModel = mongoose.models.BankAccount || mongoose.model<IBankAccount>('BankAccount', BankAccountSchema);
