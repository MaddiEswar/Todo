import { useTodos } from "../hooks/useTodos";
import { Form, Input, Button, Select } from "antd";


function TodoForm() {
  const { addTodo } = useTodos();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    addTodo({
      title: values.title,
      description: values.description,
      status: values.status,
      is_completed: false,
    });
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 500, background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <Form.Item label="Status" name="status" initialValue="draft" > 
        <Select>
          <Select.Option value="draft">Draft</Select.Option>
          <Select.Option value="published">Published</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Title" name="title"> 
        <Input placeholder="Enter task title" />
      </Form.Item>
      <Form.Item label="Description" name="description"> 
        <Input.TextArea placeholder="Enter task description" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Add Todo
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TodoForm;
