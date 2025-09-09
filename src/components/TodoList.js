// src/components/TodoList.js
import React,{useState} from "react";
import styles from "./TodoList.module.css";
import UpdateTaskForm from "./UpdateTaskForm";

function TodoList({ todos,refetch }) {
  const [editingTask, setEditingTask] = useState(null);
  if (!todos || todos.length === 0) {
    return <p>No tasks found.</p>;
  }
  return (
    <div>
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todoItem}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.is_completed ? "✅ Completed" : "❌ Pending"}</p>
          <button onClick={() => setEditingTask(todo)}>Update</button>
        </li>
      ))}
    </ul>
    {editingTask && (
        <UpdateTaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
          refetch={refetch}
        />
      )}
      </div>
  );
}

export default TodoList;
