import React, { useState, useEffect } from "react";
import ProjectService from "../services/ProjectService";
import { Button, Modal, Form, Table } from "react-bootstrap";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [projectForm, setProjectForm] = useState({
    projectId: "",
    projectName: "",
    projectManager: "",
    projectRole: "DEVELOPER",
    skillSetNeeded: "SENIOR",
    startDate: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await ProjectService.getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleShowModal = (project = null) => {
    if (project) {
      setSelectedProject(project);
      setProjectForm({ ...project });
    } else {
      setSelectedProject(null);
      setProjectForm({
        projectId: "",
        projectName: "",
        projectManager: "",
        projectRole: "DEVELOPER",
        skillSetNeeded: "SENIOR",
        startDate: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  const handleSaveProject = async () => {
    try {
      if (selectedProject) {
        await ProjectService.updateProject(projectForm.projectId, projectForm);
      } else {
        await ProjectService.addProject(projectForm);
      }
      fetchProjects();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await ProjectService.deleteProject(projectId);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2><b>LIST OF PROJECT OPENINGS</b></h2>
      <Form.Control
        type="text"
        placeholder="Search by Project Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <Button variant="primary" onClick={() => handleShowModal()} className="mb-3">
        Add Project
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Manager</th>
            <th>Role</th>
            <th>Experience Level</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects
            .filter((proj) =>
              proj.projectName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((project) => (
              <tr key={project.projectId}>
                <td>{project.projectId}</td>
                <td>{project.projectName}</td>
                <td>{project.projectManager}</td>
                <td>{project.projectRole}</td>
                <td>{project.skillSetNeeded}</td>
                <td>{project.startDate}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleShowModal(project)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(project.projectId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject ? "Edit Project" : "Add Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                value={projectForm.projectName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Manager</Form.Label>
              <Form.Control
                type="text"
                name="projectManager"
                value={projectForm.projectManager}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Role</Form.Label>
              <Form.Select name="projectRole" value={projectForm.projectRole} onChange={handleChange}>
                <option value="DEVELOPER">Developer</option>
                <option value="QUALITY_ASSURANCE">Quality Assurance</option>
                <option value="PROGRAM_MANAGER">Program Manager</option>
                <option value="SYSTEM_ADMIN">System Admin</option>
                <option value="APP_ADMIN">App Admin</option>
                <option value="SUPPORT_ENGINEER">Support Engineer</option>
                <option value="CONSULTANT">Consultant</option>
                <option value="BUSINESS_ANALYST">Business Analyst</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Experience Level</Form.Label>
              <Form.Select name="skillSetNeeded" value={projectForm.skillSetNeeded} onChange={handleChange}>
                <option value="FRESHER">Fresher</option>
                <option value="JUNIOR">Junior</option>
                <option value="MID_LEVEL">Mid Level</option>
                <option value="SENIOR">Senior</option>
                <option value="EXPERT">Expert</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={projectForm.startDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveProject}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectList;
