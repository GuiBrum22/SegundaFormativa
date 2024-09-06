import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newTodo }),
    });

    const todo = await res.json();
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleDeleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <h1>My Todos</h1>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text} <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
