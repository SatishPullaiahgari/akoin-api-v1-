// import mongoose, { Document, Schema } from 'mongoose';

// export interface User extends Document {
//   user_id: string;
//   username: string;
//   email: string;
//   password: string;
//   isKycPending: boolean;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const UserSchema = new Schema<User>({
//   user_id: { type: String, unique: true },
//   username: { type: String, required: true, unique: true },
//   email:    { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isKycPending: { type: Boolean, default: true }
// });
// export const loginBody = mongoose.model<User>("User", UserSchema);
import mongoose from 'mongoose';
import UserSchema, { IUser } from '../model/usermodel';

export const LoginModel = mongoose.models.Login || mongoose.model<IUser>('Login', UserSchema, 'users');

