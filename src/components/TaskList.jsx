import { EllipsisOutlined } from "@ant-design/icons";
import { Col, Dropdown, Menu, Row } from "antd";
import moment from "moment";

export const TaskList = ({todo,setTodo, status}) =>{
    // Function to handle menu click and update the task status
    const handleMenuClick = (task, newStatus) => {
        setTodo((prevTodo) =>
          prevTodo.map((t) => {
            if (t.title === task.title) {
              // Determine new possible transitions based on the new status
              let newMoveTo = [];
              if (newStatus === "new") {
                newMoveTo = ["onGoing"];
              } else if (newStatus === "onGoing") {
                newMoveTo = ["done"];
              } else if (newStatus === "done") {
                newMoveTo = [];
              }
              return { ...t, status: newStatus, moveTo: newMoveTo };
            }
            return t;
          }),
        );
      };

    return todo
      .filter((task) => task.status === status) // Filter tasks based on their status
      .map((task, index) => 
      {
        // Determine the background color based on the task status
        const statusBgColor = task.status === 'new' ? 'bg-blue-400' :
        task.status === 'onGoing' ? 'bg-orange-400' :
        task.status === 'done' ? 'bg-green-400' :
        '';
        return (
        <div
          key={index}
          className="flex bg-white shadow-lg px-2 py-3 mx-2 rounded-xl border-2 mb-2 hover:border-indigo-500/75"
        >
          <div className="flex-1 px-2 ">
            <Row>
              <Col xs={10} className="font-semibold">
                Title:
              </Col>
              <Col xs={14}>{task.title}</Col>
            </Row>
            <Row>
              <Col xs={10} className="font-semibold">
                Description:
              </Col>
              <Col xs={14}>{task.description}</Col>
            </Row>
            <Row>
              <Col xs={10} className="font-semibold">
                Status:
              </Col>
              <Col xs={14}>
                <div className={`inline-block px-2 py-1 ${statusBgColor} text-white rounded-xl`}>
                  {task.status}
                </div>
             </Col>
            </Row>
            <Row>
              <Col xs={10} className="font-semibold">
                Start date:
              </Col>
              <Col xs={14}>
                {moment(task.time[0].$d).format("DD-MM-YYYY")}
              </Col>
            </Row>
            <Row>
              <Col xs={10} className="font-semibold">
                End date:
              </Col>
              <Col xs={14}>
                {moment(task.time[1].$d).format("DD-MM-YYYY")}
              </Col>
            </Row>
          </div>
          {
            task.status === 'done' ? <></>
            :
            <div className="flex items-start">
              <Dropdown
                overlay={
                  <Menu>
                    {task.moveTo.map((status) => (
                      <Menu.Item
                        key={status}
                        onClick={() => handleMenuClick(task, status)}
                      >
                        {status}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <div className="cursor-pointer">
                  <EllipsisOutlined
                    rotate={90}
                    className="bg-gray-200 py-1 rounded"
                  />
                </div>
              </Dropdown>
            </div>
          }
        </div>
      )
      }
    );
}