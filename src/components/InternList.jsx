import React, { useState, useEffect } from "react";
import InternService from "../services/InternService";
import { Table, Button, Form, Modal, Pagination } from "react-bootstrap";

const InternList = () => {
    const [interns, setInterns] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const internsPerPage = 5;
    const [currentIntern, setCurrentIntern] = useState(null);

    const [internData, setInternData] = useState({
        internId: "",
        internName: "",
        internEmail: "",
        internCollege: "",
        internSkillset: "",
        internMobileNumber: "",
    });

    useEffect(() => {
        fetchInterns();
    }, []);

    const fetchInterns = async () => {
        try {
            const response = await InternService.getAllInterns();
            setInterns(response.data);
        } catch (error) {
            console.error("Error fetching interns:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await InternService.deleteIntern(id);
            setInterns(interns.filter((intern) => intern.internId !== id));
        } catch (error) {
            console.error("Error deleting intern:", error);
        }
    };

    const handleAddOrUpdateIntern = async () => {
        try {
            if (currentIntern) {
                await InternService.updateIntern(internData.internId, internData);
            } else {
                await InternService.addIntern(internData);
            }
            setShowModal(false);
            fetchInterns();
            setInternData({ internId: "", internName: "", internEmail: "", internCollege: "", internSkillset: "", internMobileNumber: "" });
        } catch (error) {
            console.error("Error saving intern:", error);
        }
    };

    const openModal = (intern = null) => {
        setCurrentIntern(intern);
        setInternData(
            intern || {
                internId: "",
                internName: "",
                internEmail: "",
                internCollege: "",
                internSkillset: "",
                internMobileNumber: "",
            }
        );
        setShowModal(true);
    };

    const filteredInterns = interns.filter((intern) =>
        intern.internName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastIntern = currentPage * internsPerPage;
    const indexOfFirstIntern = indexOfLastIntern - internsPerPage;
    const currentInterns = filteredInterns.slice(indexOfFirstIntern, indexOfLastIntern);

    const totalPages = Math.ceil(filteredInterns.length / internsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-4">
            <Button variant="success" onClick={() => openModal()} className="mb-3">
                <b>Add Intern</b>
            </Button>

            <Form.Control
                type="text"
                placeholder="Search by intern name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
            />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>College</th>
                        <th>Skillset</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentInterns.length > 0 ? (
                        currentInterns.map((intern) => (
                            <tr key={intern.internId}>
                                <td>{intern.internId}</td>
                                <td>{intern.internName}</td>
                                <td>{intern.internEmail}</td>
                                <td>{intern.internCollege}</td>
                                <td>{intern.internSkillset}</td>
                                <td>{intern.internMobileNumber}</td>
                                <td>
                                    <Button variant="info" size="sm" onClick={() => openModal(intern)} className="me-2">
                                        Update
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(intern.internId)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No interns found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <Pagination className="justify-content-center">
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentIntern ? "Update Intern" : "Add Intern"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" value={internData.internId} onChange={(e) => setInternData({ ...internData, internId: e.target.value })} disabled={currentIntern} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={internData.internName} onChange={(e) => setInternData({ ...internData, internName: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={internData.internEmail} onChange={(e) => setInternData({ ...internData, internEmail: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>College</Form.Label>
                            <Form.Control type="text" value={internData.internCollege} onChange={(e) => setInternData({ ...internData, internCollege: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Skillset</Form.Label>
                            <Form.Control type="text" value={internData.internSkillset} onChange={(e) => setInternData({ ...internData, internSkillset: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" value={internData.internMobileNumber} onChange={(e) => setInternData({ ...internData, internMobileNumber: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddOrUpdateIntern}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InternList;
