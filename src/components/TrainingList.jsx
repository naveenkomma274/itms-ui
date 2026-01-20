import React, { useState, useEffect } from "react";
import TrainingService from "../services/TrainingService";
import { Table, Button, Form, Modal, Pagination } from "react-bootstrap";

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const trainingsPerPage = 5;
    const [currentTraining, setCurrentTraining] = useState(null);

    const [trainingData, setTrainingData] = useState({
        courseId: "",
        courseName: "",
        coursePeriod: "",
        courseTutor: "",
        learnPlatform: "",
        competency: "",
        learnPlatformLink: "",
        createdDate: ""
    });

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const response = await TrainingService.getAllTrainings();
            setTrainings(response.data);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await TrainingService.deleteTraining(id);
            setTrainings(trainings.filter((training) => training.courseId !== id));
        } catch (error) {
            console.error("Error deleting training:", error);
        }
    };

    const handleAddOrUpdateTraining = async () => {
        try {
            if (currentTraining) {
                await TrainingService.updateTraining(trainingData.courseId, trainingData);
            } else {
                await TrainingService.addTraining(trainingData);
            }
            setShowModal(false);
            fetchTrainings();
            setTrainingData({ courseId: "", courseName: "", coursePeriod: "", courseTutor: "", learnPlatform: "", competency: "", learnPlatformLink: "", createdDate: "" });
        } catch (error) {
            console.error("Error saving training:", error);
        }
    };

    const openModal = (training = null) => {
        setCurrentTraining(training);
        setTrainingData(
            training || {
                courseId: "",
                courseName: "",
                coursePeriod: "",
                courseTutor: "",
                learnPlatform: "",
                competency: "",
                learnPlatformLink: "",
                createdDate: ""
            }
        );
        setShowModal(true);
    };

    const filteredTrainings = trainings.filter((training) =>
        training.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastTraining = currentPage * trainingsPerPage;
    const indexOfFirstTraining = indexOfLastTraining - trainingsPerPage;
    const currentTrainings = filteredTrainings.slice(indexOfFirstTraining, indexOfLastTraining);

    const totalPages = Math.ceil(filteredTrainings.length / trainingsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-4">
            <Button variant="success" onClick={() => openModal()} className="mb-3">
                <b>Add Training</b>
            </Button>

            <Form.Control
                type="text"
                placeholder="Search by training name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
            />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Period</th>
                        <th>Tutor</th>
                        <th>Platform</th>
                        <th>Competency</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTrainings.length > 0 ? (
                        currentTrainings.map((training) => (
                            <tr key={training.courseId}>
                                <td>{training.courseId}</td>
                                <td>{training.courseName}</td>
                                <td>{training.coursePeriod}</td>
                                <td>{training.courseTutor}</td>
                                <td>{training.learnPlatform}</td>
                                <td>{training.competency}</td>
                                <td>
                                    <Button variant="info" size="sm" onClick={() => openModal(training)} className="me-2">
                                        Update
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(training.courseId)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No trainings found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentTraining ? "Update Training" : "Add Training"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {Object.keys(trainingData).map((field) => (
                            <Form.Group key={field}>
                                <Form.Label>{field.replace(/([A-Z])/g, ' $1').trim()}</Form.Label>
                                <Form.Control
                                    type={field === "coursePeriod" ? "number" : "text"}
                                    value={trainingData[field]}
                                    onChange={(e) => setTrainingData({ ...trainingData, [field]: e.target.value })}
                                    disabled={field === "courseId" && currentTraining}
                                />
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddOrUpdateTraining}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TrainingList;
