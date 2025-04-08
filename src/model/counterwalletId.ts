import mongoose, { Document, Schema } from 'mongoose';

export interface ICounter extends Document {
  name: string; // ✅ add this field
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  name: { type: String, required: true }, // ✅ Fix: use `name` instead of `id`
  seq: { type: Number, default: 0 },
});

// ✅ Use existing model if already compiled
export const WalletCounterModel = mongoose.models.WalletCounter || mongoose.model<ICounter>('WalletCounter', CounterSchema);
