"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportHeartRateToExcel = void 0;
const heart_beatModel_1 = require("../model/heart-beatModel");
const exceljs_1 = __importDefault(require("exceljs"));
const exportHeartRateToExcel = async (req, res) => {
    const { user_id } = req.body;
    try {
        const records = await heart_beatModel_1.HeartBeatModel.find({ user_id }).sort({ recordedAt: -1 });
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('Heart Rate Data');
        worksheet.columns = [
            { header: 'S.No', key: 'sno', width: 10 },
            { header: 'Heart Rate', key: 'heartRate', width: 15 },
            { header: 'Date & Time', key: 'recordedAt', width: 30 },
        ];
        records.forEach((record, index) => {
            const date = new Date(record.recordedAt);
            const formatted = `${date.getDate()}, ${date.toLocaleString('default', { month: 'short' })} (${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')})`;
            worksheet.addRow({
                sno: index + 1,
                heartRate: record.heartRate,
                recordedAt: formatted,
            });
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=heart_rate_data.xlsx');
        await workbook.xlsx.write(res);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to export heart rate data', error });
    }
};
exports.exportHeartRateToExcel = exportHeartRateToExcel;
//# sourceMappingURL=excel-download-heart-rate.js.map