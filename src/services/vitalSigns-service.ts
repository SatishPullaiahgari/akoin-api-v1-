// import { VitalSignsModel } from '../model/vitalSigns.model';

// interface VitalSignEntry {
//   patient_id: string;
//   heartRate: number;
//   performance_heart_rate: number;
//   recorded_at: Date;
// }

// export const saveVitalSigns = async (entries: VitalSignEntry[]): Promise<void> => {
//   try {
//     await VitalSignsModel.insertMany(entries);
//   } catch (error) {
//     console.error('Error in saveVitalSigns service:', error);
//     throw error;
//   }
// };

// // Return last 20 (used optionally)
// export const getRecentVitalSigns = async (patient_id: string, limit: number = 20) => {
//   try {
//     return await VitalSignsModel.find({ patient_id })
//       .sort({ recorded_at: -1 })
//       .limit(limit);
//   } catch (error) {
//     console.error('Error in getRecentVitalSigns service:', error);
//     throw error;
//   }
// };

// // Return last N records (e.g., 7)
// export const getLatestVitalSigns = async (patient_id: string, limit: number = 7) => {
//   try {
//     return await VitalSignsModel.find({ patient_id })
//       .sort({ recorded_at: -1 })
//       .limit(limit);
//   } catch (error) {
//     console.error('Error in getLatestVitalSigns service:', error);
//     throw error;
//   }
// };
