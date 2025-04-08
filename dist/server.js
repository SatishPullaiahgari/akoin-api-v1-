"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes/routes"));
// import { walletRoutes } from "./routes/wallet";
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use("/akoin", routes_1.default);
//DB connection
mongoose_1.default
    .connect("mongodb://localhost:27017/akoin-api(updated)")
    .then(() => {
    console.log("connected successfully");
})
    .catch((error) => {
    console.log("connection failed", error);
});
app.listen(PORT, () => {
    console.log(` connect DB successfully http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map