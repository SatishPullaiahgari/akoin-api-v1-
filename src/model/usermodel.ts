import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  user_id: string;
  username: string;
  email: string;
  password: string;
  isKycPending: boolean;
  main_balance:number,
  resetToken?: string;
  resetTokenExpiry?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  user_id: { type: String, unique: true },
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isKycPending: { type: Boolean, default: true },
  main_balance:{type:Number, default:0},
  // resetToken :{type:String, required:true},
  // resetTokenExpiry:{type:String, required:true}
  
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};


export const UserModel = mongoose.model<IUser>("User", UserSchema);
