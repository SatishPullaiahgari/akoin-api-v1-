
import jwt from 'jsonwebtoken';

const SECRET_KEY = "AKOIN_SECRET_KEY";

interface UserPayload {
  user_id: string;
  email: string;
  username: string;
}

export const generateToken = (user: UserPayload): string => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '60m' });
};
