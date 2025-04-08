"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const loginSchema_1 = require("../model/loginSchema");
const generate_token_1 = require("../utilities/generate-token");
const main_blanance_model_1 = require("../model/main-blanance-model");
const loginUser = async (req, res) => {
    const { email, username, password } = req.body;
    const identifier = email || username;
    try {
        if (!identifier || !password) {
            return res.status(400).json({ message: "Username/email and password are required" });
        }
        console.log("Identifier:", identifier); // Debug
        const user = await loginSchema_1.LoginModel.findOne({
            $or: [
                { email: { $regex: new RegExp(`^${identifier}$`, "i") } },
                { username: { $regex: new RegExp(`^${identifier}$`, "i") } },
            ],
        });
        console.log("User found:", user);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or username" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = (0, generate_token_1.generateToken)({ user_id: user.user_id, email: user.email, username: user.username });
        const wallet = await main_blanance_model_1.MainBalanceModel.findOne({ user_id: user.user_id });
        res.status(200).json({
            message: "Login successful",
            token: `Bearer ${token}`
            // user: {
            //   user_id: user.user_id,
            //   username: user.username,
            //   email: user.email,
            //   isKycPending: user.isKycPending,
            //   main_balance: wallet?.main_balance || 0, 
            // },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=login-controller.js.map