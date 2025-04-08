import mongoose, { Document, Schema } from 'mongoose';

export interface IMainBalance extends Document {
  user_id: string;
  main_balance: number;
}

const MainBalanceSchema = new Schema<IMainBalance>({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  main_balance: {
    type: Number,
    default: 0,
  },
});

export const MainBalanceModel = mongoose.models.MainBalance || mongoose.model<IMainBalance>('MainBalance', MainBalanceSchema);