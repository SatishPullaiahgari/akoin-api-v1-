// model/countermodel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICounter extends Document {
  name: string;
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

export const Counter = mongoose.models.Counter || mongoose.model<ICounter>('Counter', CounterSchema);
