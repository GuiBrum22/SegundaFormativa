import connectMongo from '../../../lib/mongodb';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectMongo();
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.status(201).json({ token });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
