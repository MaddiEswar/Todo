import { useEffect } from "react";
import { Form, Input, Select, Checkbox, Button, Modal } from "antd";


const UpdateTaskForm = ({ task, onClose, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      status: task.status || "draft",
      title: task.title || "",
      description: task.description || "",
      is_completed: task.is_completed || false,
    });
  }, [task, form]);

  const onFinish = (values) => {
    onUpdate({ ...values, id: task.id });
  };

  return (
    <Modal open={true} onCancel={onClose} footer={null} title="Update Task">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Status" name="status"> 
          <Select>
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="published">Published</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Title" name="title"> 
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item label="Description" name="description"> 
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item name="is_completed" valuePropName="checked">
          <Checkbox>Completed</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>Update</Button>
          <Button onClick={onClose}>Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTaskForm;
