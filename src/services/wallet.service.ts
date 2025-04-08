import { WalletModel } from '../model/wallet.model';
import { MainBalanceModel } from '../model/main-blanance-model';
import { generateWalletId } from '../utilities/wallet-id';
import { TransactionModel } from '../model/trasanctionModel';

interface WalletPayload {
  user_id: string;
  wallet_name: string;
  wallet_type: string;
  location_name?: string;
  latitude?: string;
  longitude?: string;
  amount: number;
}

export const createWalletService = async (payload: WalletPayload) => {
  const {
    user_id,
    wallet_name,
    wallet_type,
    location_name,
    latitude,
    longitude,
    amount,
  } = payload;

  const userBalance = await MainBalanceModel.findOne({ user_id });
  if (!userBalance) throw new Error('User balance record not found');

  if (userBalance.main_balance < amount) {
    throw new Error('Insufficient main balance');
  }

  const existingWallet = await WalletModel.findOne({ user_id, wallet_name });
  if (existingWallet) {
    throw new Error('Wallet with this name already exists for this user');
  }

  const wallet_id = await generateWalletId();

  userBalance.main_balance -= amount;
  await userBalance.save();

  const wallet = await WalletModel.create({
    wallet_id,
    user_id,
    wallet_name,
    wallet_type,
    location_name,
    latitude,
    longitude,
    balance: amount,
  });


  await TransactionModel.create({
    user_id,
    type: 'expense',
    amount,
    description: `Wallet created: ${wallet_name}`,
    wallet_id: wallet_id
  });

  return {
    message: 'Wallet created successfully',
    wallet_id: wallet_id,
    wallet_name: wallet_name,
    wallet_type: wallet_type,
    
  };
};
