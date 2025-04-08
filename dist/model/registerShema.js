"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usermodel_1 = __importDefault(require("./usermodel"));
exports.RegisterModel = mongoose_1.default.models.Register || mongoose_1.default.model('Register', usermodel_1.default, 'users');
//# sourceMappingURL=registerShema.js.map