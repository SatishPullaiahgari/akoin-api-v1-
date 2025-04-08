import mongoose, { Document, Schema } from 'mongoose';

export interface IWallet extends Document {
  wallet_id: string;
  user_id: string;
  wallet_name: string;
  wallet_type: string;
  location_name?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  balance: number;
}

const WalletSchema = new Schema<IWallet>({
  wallet_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  wallet_name: { type: String, required: true },
  wallet_type: { type: String, required: true },
  location_name: { type: String, default: null },
  latitude: { type: String, default: null },
  longitude: { type: String, default: null },
  balance: { type: Number, required: true },
});

export const WalletModel = mongoose.models.Wallet || mongoose.model<IWallet>('Wallet', WalletSchema);

