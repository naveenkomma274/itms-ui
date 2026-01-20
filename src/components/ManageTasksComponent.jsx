import React, { useState } from "react";
import "../App.css";

const ManageTasksComponent = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Submitted:", { taskName, taskDescription, taskPriority, isRecurring });
  };

  return (
    <div className="manage-tasks-container container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8 task-form">
          <h2 className="text-center">Manage Tasks</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Name</label>
              <input
                type="text"
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Task Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Recurring Task?</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isRecurring}
                  onChange={() => setIsRecurring(!isRecurring)}
                />
                <label className="form-check-label">Yes</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageTasksComponent;
