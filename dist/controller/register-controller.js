"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const generate_token_1 = require("../utilities/generate-token");
const generate_id_1 = require("../utilities/generate-id");
const registerShema_1 = require("../model/registerShema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await registerShema_1.RegisterModel.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user_id = await (0, generate_id_1.generateNextUserId)();
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new registerShema_1.RegisterModel({
            user_id,
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = (0, generate_token_1.generateToken)({
            user_id: newUser.user_id,
            email: newUser.email,
            username: newUser.username
        });
        res.status(200).json({ message: 'User registered', token: `Bearer ${token}`, user_id });
    }
    catch (error) {
        console.error("Unable to register user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=register-controller.js.map