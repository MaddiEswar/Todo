import { QueryClient, QueryClientProvider } from "react-query";
import TodoForm from "./components/TodoForm";
import { useTodos } from "./hooks/useTodos";
import { useState } from "react";
import UpdateTaskForm from "./components/UpdateTaskForm";
import { Button, List, Row, Col, Card } from "antd";

const queryClient = new QueryClient();

function AppContent() {
  const { todos, isLoading, error, updateTodo, deleteTodo } = useTodos();
  const [editingTask, setEditingTask] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching todos</p>;

  const pending = todos?.filter(todo => !todo.is_completed) || [];
  const completed = todos?.filter(todo => todo.is_completed) || [];

  const handleUpdate = (task) => setEditingTask(task);
  const handleDelete = (id) => deleteTodo(id);
  const handleUpdateSubmit = async (updatedTask) => {
    await updateTodo({ id: updatedTask.id, updates: updatedTask });
    setEditingTask(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f4f6fa 0%, #e9f0ff 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Row gutter={40} style={{ width: "100%", maxWidth: 1400, padding: "48px 0" }} align="top" justify="center">
        <Col xs={24} md={8} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: 32, letterSpacing: 1, color: "#222" }}>Todo App</h1>
          <Card style={{ width: "100%", maxWidth: 480, marginBottom: 40, borderRadius: 18, boxShadow: "0 4px 24px rgba(0,0,0,0.10)", background: "#fff" }} bodyStyle={{ padding: "32px 28px" }}>
            <TodoForm />
          </Card>
        </Col>
        <Col xs={24} md={7} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 24, color: "#1a237e" }}>Pending Tasks</h2>
          <List
            dataSource={pending}
            renderItem={todo => (
              <Card
                hoverable
                style={{ marginBottom: 24, borderRadius: 14, boxShadow: "0 2px 12px rgba(30,64,175,0.08)", transition: "box-shadow 0.2s" }}
  
              >
                <List.Item.Meta
                    title={<span style={{ fontWeight: 700, fontSize: "1rem", color: "#222" }}>{todo.title}</span>}
                    description={<span style={{ color: '#555', fontSize: "1rem" }}>{todo.description}</span>}
                  />
                <List.Item key={todo.id} actions={[
                  <Button type="primary" style={{ borderRadius: 8 }} onClick={() => handleUpdate(todo)}>Update</Button>,
                  <Button danger style={{ borderRadius: 8, borderColor: "#f44336", color: "#f44336" }} onClick={() => handleDelete(todo.id)}>Delete</Button>
                ]}>
                  
                </List.Item>
              </Card>
            )}
            locale={{ emptyText: <span style={{ color: '#aaa', fontSize: "1.1rem" }}>No pending tasks</span> }}
          />
        </Col>
        <Col xs={24} md={7} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 24, color: "#388e3c" }}>Completed Tasks</h2>
          <List
            dataSource={completed}
            renderItem={todo => (
              <Card
                hoverable
                style={{marginBottom: 24, borderRadius: 14, boxShadow: "0 2px 12px rgba(56,142,60,0.08)", transition: "box-shadow 0.2s" }}
               
              >
                <List.Item.Meta
                    title={<span style={{ fontWeight: 700, fontSize: "1rem", color: "#222" }}>{todo.title}</span>}
                    description={<span style={{ color: '#555', fontSize: "1rem" }}>{todo.description}</span>}
                  />
                <List.Item key={todo.id} actions={[
                  <Button type="primary" style={{ borderRadius: 8 }} onClick={() => handleUpdate(todo)}>Update</Button>,
                  <Button danger style={{ borderRadius: 8, borderColor: "#f44336", color: "#f44336" }} onClick={() => handleDelete(todo.id)}>Delete</Button>
                ]}>
                  
                </List.Item>
              </Card>
            )}
            locale={{ emptyText: <span style={{ color: '#aaa', fontSize: "1.1rem" }}>No completed tasks</span> }}
          />
        </Col>
        {editingTask && (
          <div className="modal">
            <UpdateTaskForm
              task={editingTask}
              onClose={() => setEditingTask(null)}
              onUpdate={handleUpdateSubmit}
            />
          </div>
        )}
      </Row>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
