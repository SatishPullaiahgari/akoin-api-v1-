"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "AKOIN_SECRET_KEY";
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign(user, SECRET_KEY, { expiresIn: '60m' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generate-token.js.map