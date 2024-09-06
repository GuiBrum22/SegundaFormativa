import connectMongo from '../../../lib/mongodb';
import Todo from '../../../models/Todo';
import { verifyToken } from '../../../utils/authMiddleware';

export default async function handler(req, res) {
  await connectMongo();
  const user = verifyToken(req);

  if (req.method === 'GET') {
    const todos = await Todo.find({ userId: user.userId });
    res.json(todos);
  } else if (req.method === 'POST') {
    const { text } = req.body;
    const todo = await Todo.create({ text, userId: user.userId });
    res.status(201).json(todo);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
