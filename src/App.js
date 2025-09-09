import { QueryClient, QueryClientProvider } from "react-query";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import styles from "./App.module.css";

const queryClient = new QueryClient();

function TodoApp() {
  const { todos, isLoading, error, addTodo, updateTodo, deleteTodo } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching todos</p>;

  return (
    <div>
      <h1 className={styles.heading}>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}
