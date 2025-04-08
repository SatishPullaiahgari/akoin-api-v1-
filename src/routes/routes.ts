import { registerUser } from "../controller/register-controller";
import express from 'express';
import { loginUser } from "../controller/login-controller";
import { updateKyc } from "../controller/update_kyc";
import { createWallet } from "../controller/create-wallet.controller";
import { addOrUpdateMainBalance } from "../controller/add_main-balance";
import { getDashboardData } from "../controller/dashboard-controller";
import { getUserWalletsOnly } from "../controller/wallets-controller";
import { getTransactionHistory } from "../controller/transaction-history-controller";





const router = express.Router();


router.post("/register-user", registerUser);
router.post("/login-user", loginUser)
router.post("/update-kyc", updateKyc);

// wallet
router.post("/create-wallet", createWallet);
router.post("/add-main-balance", addOrUpdateMainBalance);


//Dashboard api
router.post("/dashboard", getDashboardData);
router.post("/wallets", getUserWalletsOnly);

//transaction history
router.post("/transaction-history", getTransactionHistory);





export default router;