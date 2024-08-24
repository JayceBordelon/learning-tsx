import React, { useState } from 'react';
import { TodoItem } from '../data/types';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    if (newTodo.trim()) {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        name: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id: number, currentName: string) => {
    setEditingId(id);
    setEditingText(currentName);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEditing = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, name: editingText } : todo
    ));
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="todo-input"
        />
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="todo-input-edit"
                />
                <FaCheck size={25} className="icon save-icon" onClick={() => saveEditing(todo.id)} />
                <FaTimes size={25} className="icon cancel-icon" onClick={cancelEditing} />
              </>
            ) : (
              <>
                <span
                  className={`todo-name ${todo.completed ? 'completed' : ''}`}
                  onClick={() => toggleTodoCompletion(todo.id)}
                >
                  {todo.name}
                </span>
                <FaEdit size={25} className="icon edit-icon" onClick={() => startEditing(todo.id, todo.name)} />
                <FaTrash size={25} className="icon delete-icon" onClick={() => deleteTodo(todo.id)} />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
