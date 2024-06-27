import { Button, DatePicker, Form, Input, Modal } from "antd";
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

export const TaskForm = ({ isModalOpen, setIsModalOpen, setTodo }) => {
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Function to handle form submission
  const handleFinish = (values) => {
     // Create a new task object with form values and default status and moveTo options
    const newTask = {
      title: values.title,
      description: values.description,
      status: "new",
      moveTo: ["onGoing", "done"],
      time: values.time,
    };

    // Update the todo list with the new task
    setTodo((prev) => [...prev, newTask]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add a new task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please add title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please add description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Task duration"
            name="time"
            rules={[
              {
                required: true,
                message: "Please add task duration!",
              },
            ]}
          >
            <RangePicker />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
            className="flex justify-center"
          >
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
