import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

function App() {
  const [todo, setTodo] = useState([
    {
      title: "Task 1",
      description: "This is my first task.",
      status: "new",
      moveTo: ["onGoing", "done"],
      time: [new Date(), new Date()],
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-center text-neutral-600 text-3xl p-3 m-4">
        Your Most Desired Todo List Application!
      </h1>
      <div className="grid grid-cols-1 gap-2 mb-5 sm:grid-cols-3">
        {/* Column for 'New' tasks */}
        <div className="">
          <p className="text-center text-3xl mb-2">New</p>
          <TaskList todo={todo} setTodo={setTodo} status="new"/>
          <div className="text-center">
            <Button
              type="dashed"
              onClick={() => setIsModalOpen(true)}
              icon={<PlusOutlined />}
            >
              Add a new task
            </Button>
          </div>
        </div>
        {/* Column for 'On Going' tasks */}
        <div>
          <p className="text-center text-3xl mb-2">On Going</p>
          <TaskList todo={todo} setTodo={setTodo} status="onGoing"/>
        </div>
        {/* Column for 'Done' tasks */}
        <div>
          <p className="text-center text-3xl mb-2">Done</p>
          <TaskList todo={todo} setTodo={setTodo} status="done"/>
        </div>
      </div>
      {isModalOpen && (
        <TaskForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setTodo={setTodo}
        />
      )}
    </>
  );
}

export default App;
