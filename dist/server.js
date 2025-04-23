"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Routes
app.use("/akoin", routes_1.default);
// ✅ Connect to DB and start server only if DB is connected
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("❌ MONGO_URI not defined in .env file");
    process.exit(1);
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
});
//# sourceMappingURL=server.js.map