import connectMongo from '../../../lib/mongodb';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectMongo();
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
