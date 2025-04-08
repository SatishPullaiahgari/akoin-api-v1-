"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNextUserId = void 0;
// utilities/generateUserId.ts
const countermodel_1 = require("../model/countermodel");
const generateNextUserId = async () => {
    const result = await countermodel_1.Counter.findOneAndUpdate({ name: 'user_custom_id' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
    if (!result || result.seq === undefined) {
        throw new Error("Failed to generate user_id");
    }
    return `AKOINUSR${String(result.seq).padStart(6, '0')}`;
};
exports.generateNextUserId = generateNextUserId;
//# sourceMappingURL=generate-id.js.map