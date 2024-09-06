import connectMongo from '../../../lib/mongodb';
import Todo from '../../../models/Todo';
import { verifyToken } from '../../../utils/authMiddleware';

export default async function handler(req, res) {
  await connectMongo();
  const user = verifyToken(req);

  const { id } = req.query;

  if (req.method === 'PUT') {
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.json(todo);
  } else if (req.method === 'DELETE') {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
