import React, { useState } from "react";
import axios from "axios";
import styles from "./UpdateTaskForm.module.css"; // import module CSS

const BASE_URL = "http://62.72.12.81:3108/items/Todos";
const TOKEN = "MjnYFeSY2BKzrdKMbWuQYbNLiCqAPRmo";

const UpdateTaskForm = ({ task, onClose, refetch }) => {
  const [updatedTask, setUpdatedTask] = useState({
    status: task.status || "draft",
    title: task.title || "",
    description: task.description || "",
    is_completed: task.is_completed || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/${task.id}`, updatedTask, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      refetch();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Update Task</h2>

      <div className={styles.formRow}>
        <label>Status:</label>
        <select
          name="status"
          value={updatedTask.status}
          onChange={handleChange}
        >
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
        </select>
      </div>

      <div className={styles.formRow}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>

      <div className={styles.formRow}>
        <label>Description:</label>
        <textarea
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

      <div className={`${styles.formRow} ${styles.checkboxRow}`}>
        <label>Completed:</label>
        <input
          type="checkbox"
          name="is_completed"
          checked={updatedTask.is_completed}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formButtons}>
        <button type="submit" className={styles.saveButton}>Save</button>
        <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default UpdateTaskForm;
