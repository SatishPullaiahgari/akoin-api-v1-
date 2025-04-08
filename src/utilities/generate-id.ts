// utilities/generateUserId.ts
import { Counter } from '../model/countermodel';

export const generateNextUserId = async (): Promise<string> => {
  const result = await Counter.findOneAndUpdate(
    { name: 'user_custom_id' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  if (!result || result.seq === undefined) {
    throw new Error("Failed to generate user_id");
  }

  return `AKOINUSR${String(result.seq).padStart(6, '0')}`;
};
