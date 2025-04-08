import { WalletCounterModel } from '../model/counterwalletId';

export const generateWalletId = async (): Promise<string> => {
  await WalletCounterModel.updateOne(
    { name: 'wallet_id' },
    {
      $inc: { seq: 1 },
      $setOnInsert: { name: 'wallet_id' },
    },
    { upsert: true }
  );

  const counter = await WalletCounterModel.findOne({ name: 'wallet_id' });

  if (!counter) {
    throw new Error('Failed to generate wallet ID');
  }

  const padded = counter.seq.toString().padStart(6, '0');
  return `WALLET${padded}`;
};
