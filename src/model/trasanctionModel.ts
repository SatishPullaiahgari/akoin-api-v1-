
import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  description?: string;
  wallet_id?: string; 
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  user_id: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  wallet_id: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const TransactionModel =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>('Transaction', TransactionSchema);
