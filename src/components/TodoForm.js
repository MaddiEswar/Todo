// src/components/TodoForm.js
import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import styles from "./TodoForm.module.css";

const API_URL = "http://62.72.12.81:3108/items/Todos";
const TOKEN = "MjnYFeSY2BKzrdKMbWuQYbNLiCqAPRmo";

function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [status, setStatus] = useState("draft");

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (newTodo) => {
      return await axios.post(API_URL, newTodo, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos"); // refresh todos after adding
        setTitle("");
        setDescription("");
        setIsCompleted(false);
        setStatus("draft");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description,
      is_completed: isCompleted,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        <label>Is Completed</label>
      </div>

      <button type="submit" className={styles.submitButton}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
