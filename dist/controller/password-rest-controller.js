"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReset = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usermodel_1 = require("../model/usermodel");
const email_service_1 = require("../services/email-service");
const passwordReset = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usermodel_1.UserModel.findOne({ email });
        console.log("Request Body", user);
        if (!user) {
            return res.status(400).json({ message: "username or email is not found to update password" });
        }
        const isSamePassword = await bcryptjs_1.default.compare(password, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: "Password must be a new password" });
        }
        console.log("Request body:", req.body);
        const hasedPassword = await bcryptjs_1.default.hash(password, 10);
        user.password = hasedPassword;
        await user.save();
        await (0, email_service_1.sendResetPasswordEmail)(user.email, user.username, password);
        res.status(200).json({ message: "Password reset successfully completed" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.passwordReset = passwordReset;
//# sourceMappingURL=password-rest-controller.js.map