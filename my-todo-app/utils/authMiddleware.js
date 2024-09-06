import jwt from 'jsonwebtoken';

export function verifyToken(req) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    throw new Error('Not authenticated');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}
