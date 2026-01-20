import React, { useState, useEffect } from "react";
import TaskService from "../services/TaskService";
import { Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { saveAs } from 'file-saver';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const [selectedTask, setSelectedTask] = useState(null);

    const [newTask, setNewTask] = useState({
        taskName: "",
        taskDesc: "",
        priority: "MEDIUM",
        recurring: false,
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await TaskService.getAllTasks();
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await TaskService.deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleAddTask = async () => {
        try {
            const response = await TaskService.addTask(newTask);
            setTasks([...tasks, response.data]);
            setShowModal(false);
            setNewTask({ taskName: "", taskDesc: "", priority: "MEDIUM", recurring: false });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleUpdateTask = async () => {
        try {
            await TaskService.updateTask(selectedTask.id, selectedTask);
            fetchTasks();
            setShowUpdateModal(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const openUpdateModal = (task) => {
        setSelectedTask(task);
        setShowUpdateModal(true);
    };

    const filteredTasks = tasks.filter(task =>
        (task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         task.taskDesc.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (priorityFilter === "" || task.priority === priorityFilter)
    );

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const handleDownloadTasks = async () => {
        try {
            const response = await TaskService.exportTasks();
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'Tasks.xlsx');
        } catch (error) {
            console.error('Error downloading tasks:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex mb-3">
                <Button variant="success" onClick={() => setShowModal(true)} className="me-2">
                    <b>ADD TASKS</b>
                </Button>
                <Button variant="primary" onClick={handleDownloadTasks}>
                    <b>DOWNLOAD TASKS</b>
                </Button>
            </div>

            <div className="d-flex gap-3 mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by task name or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Form.Select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="">All Priorities</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </Form.Select>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Recurring</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.length > 0 ? (
                        currentTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.taskName}</td>
                                <td>{task.taskDesc}</td>
                                <td>{task.priority}</td>
                                <td>{task.recurring ? "Yes" : "No"}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2" onClick={() => openUpdateModal(task)}>
                                        Update
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="6" className="text-center">No tasks found</td></tr>
                    )}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="justify-content-center">
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => handlePageChange(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton><Modal.Title>Add Task</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control type="text" placeholder="Task Name" value={newTask.taskName} onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })} className="mb-2" />
                        <Form.Control as="textarea" placeholder="Task Description" value={newTask.taskDesc} onChange={(e) => setNewTask({ ...newTask, taskDesc: e.target.value })} className="mb-2" />
                        <Form.Select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="mb-2">
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </Form.Select>
                        <Form.Check type="checkbox" label="Recurring" checked={newTask.recurring} onChange={(e) => setNewTask({ ...newTask, recurring: e.target.checked })} className="mb-2" />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddTask}>Add</Button>
                </Modal.Footer>
            </Modal>

            {/* Update Task Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Task Name</b></Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedTask?.taskName || ""}
                                onChange={(e) =>
                                    setSelectedTask({ ...selectedTask, taskName: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><b>Description</b></Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedTask?.taskDesc || ""}
                                onChange={(e) =>
                                    setSelectedTask({ ...selectedTask, taskDesc: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><b>Priority</b></Form.Label>
                            <Form.Select
                                value={selectedTask?.priority || "MEDIUM"}
                                onChange={(e) =>
                                    setSelectedTask({ ...selectedTask, priority: e.target.value })
                                }
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><b>Recurring</b></Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Is Recurring?"
                                checked={selectedTask?.recurring || false}
                                onChange={(e) =>
                                    setSelectedTask({ ...selectedTask, recurring: e.target.checked })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateTask}>
                        Update Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TaskList;