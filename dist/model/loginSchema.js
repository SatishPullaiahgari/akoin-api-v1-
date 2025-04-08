"use strict";
// import mongoose, { Document, Schema } from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModel = void 0;
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
const mongoose_1 = __importDefault(require("mongoose"));
const usermodel_1 = __importDefault(require("../model/usermodel"));
exports.LoginModel = mongoose_1.default.models.Login || mongoose_1.default.model('Login', usermodel_1.default, 'users');
//# sourceMappingURL=loginSchema.js.map