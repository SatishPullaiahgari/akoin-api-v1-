"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_controller_1 = require("../controller/register-controller");
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controller/login-controller");
const update_kyc_1 = require("../controller/update_kyc");
const create_wallet_controller_1 = require("../controller/create-wallet.controller");
const add_main_balance_1 = require("../controller/add_main-balance");
const dashboard_controller_1 = require("../controller/dashboard-controller");
const wallets_controller_1 = require("../controller/wallets-controller");
const transaction_history_controller_1 = require("../controller/transaction-history-controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const add_bank_account_controller_1 = require("../controller/add-bank-account-controller");
const get_all_bankaccounts_1 = require("../controller/get-all-bankaccounts");
const password_rest_controller_1 = require("../controller/password-rest-controller");
//for heartbeat post naveen
const heart_beat_controller_1 = require("../controller/heart-beat-controller");
const show_heart_beat_controller_1 = require("../controller/show-heart-beat-controller");
const get_breathe_rate_1 = require("../controller/get-breathe-rate");
const post_brethe_rate_1 = require("../controller/post-brethe-rate");
const excel_download_heart_rate_1 = require("../controller/excel-download-heart-rate");
const vitalSign_controller_1 = require("../controller/vitalSign-controller");
const router = express_1.default.Router();
router.post('/vital-signs', vitalSign_controller_1.createVitalSigns);
router.get('/vital-signs/data', vitalSign_controller_1.getRecentVitalSigns);
//heart-beat rourtes
router.post("/heart-beat", heart_beat_controller_1.postHeartBeat);
router.get("/heart-beat", show_heart_beat_controller_1.getUserHeartBeats);
//breathe-rates
router.post("/breathe-rate", post_brethe_rate_1.postBreathRate);
router.get("/breathe-rate", get_breathe_rate_1.getUserBreathRates);
router.get('/heart-rate/export', excel_download_heart_rate_1.exportHeartRateToExcel);
router.post("/register-user", register_controller_1.registerUser);
router.post("/login-user", login_controller_1.loginUser);
router.use(auth_middleware_1.verifyToken);
router.post("/update-kyc", update_kyc_1.updateKyc);
// wallet
router.post("/create-wallet", auth_middleware_1.verifyToken, create_wallet_controller_1.createWallet);
router.post("/add-main-balance", auth_middleware_1.verifyToken, add_main_balance_1.addOrUpdateMainBalance);
//Dashboard api
router.post("/dashboard", auth_middleware_1.verifyToken, dashboard_controller_1.getDashboardData);
router.post("/wallets", auth_middleware_1.verifyToken, wallets_controller_1.getUserWalletsOnly);
//transaction history
router.post("/transaction-history", auth_middleware_1.verifyToken, transaction_history_controller_1.getTransactionHistory);
//bank-accounts
router.post("/add-bank-account", auth_middleware_1.verifyToken, add_bank_account_controller_1.addBankAccount);
router.get("/get-bank-accounts", auth_middleware_1.verifyToken, get_all_bankaccounts_1.getAllBankAccounts);
//passsword-reset
router.post("/reset-password", password_rest_controller_1.passwordReset);
exports.default = router;
//# sourceMappingURL=routes.js.map