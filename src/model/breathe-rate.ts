import mongoose, { Schema, Document } from 'mongoose';

export interface IBreathRate extends Document {
  user_id: string;
  breathRate: number;
  recordedAt: Date;
}

const BreathRateSchema = new Schema<IBreathRate>({
  user_id: { type: String, required: true },
  breathRate: { type: Number, required: true },
  recordedAt: { type: Date, default: Date.now },
});

export const BreathRateModel = mongoose.model<IBreathRate>('BreathRate', BreathRateSchema);
