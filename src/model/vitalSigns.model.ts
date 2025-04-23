import mongoose from "mongoose";

// Define schema for vital signs
const vitalSignsSchema = new mongoose.Schema({
    patient_id: {
        type: String,
        required: true
    },
    resting_heart_rate: {
        type: [Number],  // This stores an array of numbers
        required: true,
        validate: {
            validator: function (value:any) {
                return value.length === 20; // Ensure exactly 20 records
            },
            message: 'You must provide exactly 20 resting heart rate records.'
        }
    },
    performance_heart_rate: {
        type: [Number],  // This stores an array of numbers
        required: true,
        validate: {
            validator: function (value:any) {
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
const VitalSigns = mongoose.model('VitalSigns', vitalSignsSchema);

module.exports = VitalSigns;
