import mongoose from 'mongoose';
import UserSchema, { IUser } from './usermodel';

export const RegisterModel = mongoose.models.Register || mongoose.model<IUser>('Register', UserSchema, 'users');
