import jwt from 'jsonwebtoken';

const SECRET_KEY = "AKOIN_SECRET_KEY";

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '60m' });
};
