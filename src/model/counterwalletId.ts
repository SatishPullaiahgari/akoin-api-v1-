import mongoose, { Document, Schema } from 'mongoose';

export interface ICounter extends Document {
  name: string; 
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  name: { type: String, required: true }, 
  seq: { type: Number, default: 0 },
});


export const WalletCounterModel = mongoose.models.WalletCounter || mongoose.model<ICounter>('WalletCounter', CounterSchema);
