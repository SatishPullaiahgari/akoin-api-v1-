"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define schema for vital signs
const vitalSignsSchema = new mongoose_1.default.Schema({
    patient_id: {
        type: String,
        required: true
    },
    resting_heart_rate: {
        type: [Number], // This stores an array of numbers
        required: true,
        validate: {
            validator: function (value) {
                return value.length === 20; // Ensure exactly 20 records
            },
            message: 'You must provide exactly 20 resting heart rate records.'
        }
    },
    performance_heart_rate: {
        type: [Number], // This stores an array of numbers
        required: true,
        validate: {
            validator: function (value) {
                return value.length === 20; // Ensure exactly 20 records
            },
            message: 'You must provide exactly 20 performance heart rate records.'
        }
    },
    recorded_at: {
        type: Date,
        default: Date.now
    }
});
// Create model
const VitalSigns = mongoose_1.default.model('VitalSigns', vitalSignsSchema);
module.exports = VitalSigns;
//# sourceMappingURL=vitalSigns.model.js.map