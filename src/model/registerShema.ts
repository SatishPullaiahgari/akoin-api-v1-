// import mongoose from 'mongoose';
// import { UserModel, IUser } from './usermodel'; // ✅ Correct: named imports


// export const RegisterModel = mongoose.models.Register || mongoose.model<IUser>('Register', UserModel, 'users');
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IRegister extends Document {
  user_id: string;
  username: string;
  email: string;
  password: string;
  isKycPending: boolean;
  main_balance: number;
  resetToken?: string;
  resetTokenExpiry?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const RegisterSchema = new Schema<IRegister>({
  user_id: { type: String, unique: true },
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isKycPending: { type: Boolean, default: true },
  main_balance: { type: Number, default: 0 },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }
});

// Password comparison method
RegisterSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const RegisterModel = mongoose.models.Register || mongoose.model<IRegister>('Register', RegisterSchema, 'users');

