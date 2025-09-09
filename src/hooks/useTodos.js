import { useQuery, useMutation, useQueryClient } from "react-query";
import directus from "../api/directus";

// Fetch Todos
const fetchTodos = async () => {
  const { data } = await directus.get("/items/Todos"); 
  return data.data; 
};

// Add Todo
const addTodo = async (todo) => {
  const { data } = await directus.post("/items/Todos", todo);
  return data.data;
};

// Update Todo
const updateTodo = async ({ id, updates }) => {
  const { data } = await directus.patch(`/items/Todos/${id}`, updates);
  return data.data;
};


// Delete Todo
const deleteTodo = async (id) => {
  await directus.delete(`/items/Todos/${id}`);
  return id;
};

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, error } = useQuery("todos", fetchTodos);

  const addMutation = useMutation(addTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  return {
    todos,
    isLoading,
    error,
    addTodo: addMutation.mutate,
    updateTodo: updateMutation.mutate,
    deleteTodo: deleteMutation.mutate,
  };
}
