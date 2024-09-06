'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data.data);
  };

  const addTodo = async () => {
    if (!newTodo) return;
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await response.json();
    setTodos([...todos, data.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const startEditTodo = (todo) => {
    setEditTodoId(todo._id);
    setEditTitle(todo.title);
  };

  const updateTodo = async () => {
    if (!editTitle) return;
    const response = await fetch(`/api/todos/${editTodoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editTitle }),
    });
    const data = await response.json();
    setTodos(
      todos.map((todo) =>
        todo._id === editTodoId ? { ...todo, title: data.data.title } : todo
      )
    );
    setEditTodoId(null);
    setEditTitle('');
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nova Tarefa"
      />
      <button onClick={addTodo}>Adicionar Tarefa</button>

      {editTodoId && (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Editar Tarefa"
          />
          <button onClick={updateTodo}>Salvar</button>
          <button onClick={() => setEditTodoId(null)}>Cancelar</button>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span>{todo.title}</span>
            <button onClick={() => startEditTodo(todo)}>Editar</button>
            <button onClick={() => deleteTodo(todo._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
