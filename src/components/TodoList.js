// src/components/TodoList.js
import React from "react";
import styles from "./TodoList.module.css";

function TodoList({ todos }) {
  if (!todos || todos.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todoItem}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.is_completed ? "✅ Completed" : "❌ Pending"}</p>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
