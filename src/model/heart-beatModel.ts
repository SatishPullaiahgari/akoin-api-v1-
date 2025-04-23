import mongoose, { Schema, Document } from 'mongoose';
export interface IHeartBeat extends Document {
  user_id: string;
  heartRate: number;
  recordedAt: Date;
}
const HeartBeatSchema = new Schema<IHeartBeat>({
  user_id: { type: String, required: true },
  heartRate: { type: Number, required: true },
  recordedAt: { type: Date, default: Date.now },
});
export const HeartBeatModel = mongoose.model<IHeartBeat>('HeartBeat', HeartBeatSchema);
