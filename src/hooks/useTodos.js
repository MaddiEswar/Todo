import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const API_URL = "http://62.72.12.81:3108";
const TOKEN = process.env.REACT_APP_DIRECTUS_TOKEN;

const directus = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, error } = useQuery("todos", async () => {
    const { data } = await directus.get("/items/Todos");
    return data.data;
  });

  const addTodo = useMutation(
    async (todo) => (await directus.post("/items/Todos", todo)).data.data,
    { onSuccess: () => queryClient.invalidateQueries("todos") }
  );

  const updateTodo = useMutation(
    async ({ id, updates }) => (await directus.patch(`/items/Todos/${id}`, updates)).data.data,
    { onSuccess: () => queryClient.invalidateQueries("todos") }
  );

  const deleteTodo = useMutation(
    async (id) => { await directus.delete(`/items/Todos/${id}`);  },
    { onSuccess: () => queryClient.invalidateQueries("todos") }
  );

  return {
    todos,
    isLoading,
    error,
    addTodo: addTodo.mutate,
    updateTodo: updateTodo.mutate,
    deleteTodo: deleteTodo.mutate,
  };
};