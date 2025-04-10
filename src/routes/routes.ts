import { registerUser } from "../controller/register-controller";
import express from 'express';
import { loginUser } from "../controller/login-controller";
import { updateKyc } from "../controller/update_kyc";
import { createWallet } from "../controller/create-wallet.controller";
import { addOrUpdateMainBalance } from "../controller/add_main-balance";
import { getDashboardData } from "../controller/dashboard-controller";
import { getUserWalletsOnly } from "../controller/wallets-controller";
import { getTransactionHistory } from "../controller/transaction-history-controller";
import { verifyToken } from '../middleware/auth.middleware';
import { addBankAccount } from "../controller/add-bank-account-controller";
import { getAllBankAccounts } from "../controller/get-all-bankaccounts";
import { passwordReset } from "../controller/password-rest-controller";






const router = express.Router();



router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.post("/reset-password", passwordReset);


router.use(verifyToken);

router.post("/update-kyc", updateKyc);

// wallet
router.post("/create-wallet", verifyToken, createWallet);
router.post("/add-main-balance", verifyToken,addOrUpdateMainBalance);


//Dashboard api
router.post("/dashboard", verifyToken,getDashboardData);
router.post("/wallets", verifyToken, getUserWalletsOnly);

//transaction history
router.post("/transaction-history",verifyToken, getTransactionHistory);

//bank-accounts
router.post("/add-bank-account", verifyToken,addBankAccount)
router.get("/get-bank-accounts", verifyToken, getAllBankAccounts);

//passsword-reset
// router.post("/reset-password", passwordReset);





export default router;