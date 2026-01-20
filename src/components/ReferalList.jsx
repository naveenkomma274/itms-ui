import React, { useEffect, useState } from "react";
import ReferalService from "../services/ReferalService";
import { Button, Table, Modal, Form } from "react-bootstrap";

const ReferalList = () => {
  const [referals, setReferals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReferal, setSelectedReferal] = useState(null);
  const [searchPosition, setSearchPosition] = useState("");
  const [newReferal, setNewReferal] = useState({
    referalId: "",
    candidateName: "",
    referalPosition: "",
    yearOfExp: "",
    prevOrg: "",
    mobileNum: "",
    refferedBy: "",
    date: "",
  });

  useEffect(() => {
    fetchReferals();
  }, []);

  const fetchReferals = () => {
    ReferalService.getAllReferals(0, 100, null, searchPosition)
      .then((response) => setReferals(response.data))
      .catch((error) => console.error("Error fetching referrals:", error));
  };

  const handleAddReferal = () => {
    ReferalService.addReferal(newReferal)
      .then(() => {
        fetchReferals();
        setShowModal(false);
        resetForm();
      })
      .catch((error) => console.error("Error adding referral:", error));
  };

  const handleUpdateReferal = () => {
    if (!selectedReferal) return;

    ReferalService.updateReferal(selectedReferal.referalId, selectedReferal)
      .then(() => {
        fetchReferals();
        setShowUpdateModal(false);
      })
      .catch((error) => console.error("Error updating referral:", error));
  };

  const handleDeleteReferal = (referalId) => {
    ReferalService.deleteReferal(referalId)
      .then(() => fetchReferals())
      .catch((error) => console.error("Error deleting referral:", error));
  };

  const resetForm = () => {
    setNewReferal({
      referalId: "",
      candidateName: "",
      referalPosition: "",
      yearOfExp: "",
      prevOrg: "",
      mobileNum: "",
      refferedBy: "",
      date: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2><b>LIST OF REFERALS</b></h2>

      {/* Search by Position */}
      <Form.Control
        type="text"
        placeholder="Search by position opening"
        value={searchPosition}
        onChange={(e) => setSearchPosition(e.target.value)}
        className="mb-3"
      />
      <Button variant="primary" onClick={fetchReferals} className="mb-3">
        Search
      </Button>

      {/* Add Referral Button */}
      <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
        Add Referral
      </Button>

      {/* Referral Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Candidate</th>
            <th>Position</th>
            <th>Experience</th>
            <th>Previous Org</th>
            <th>Mobile</th>
            <th>Referred By</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {referals.map((referal) => (
            <tr key={referal.referalId}>
              <td>{referal.referalId}</td>
              <td>{referal.candidateName}</td>
              <td>{referal.referalPosition}</td>
              <td>{referal.yearOfExp}</td>
              <td>{referal.prevOrg}</td>
              <td>{referal.mobileNum}</td>
              <td>{referal.refferedBy}</td>
              <td>{referal.date}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedReferal(referal);
                    setShowUpdateModal(true);
                  }}
                >
                  Update
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteReferal(referal.referalId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Referral Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Referral</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(newReferal).map((key) => (
              <Form.Group key={key} className="mb-2">
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  type={key === "yearOfExp" ? "number" : "text"}
                  value={newReferal[key]}
                  onChange={(e) => setNewReferal({ ...newReferal, [key]: e.target.value })}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddReferal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Referral Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Referral</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReferal && (
            <Form>
              {Object.keys(selectedReferal).map((key) => (
                <Form.Group key={key} className="mb-2">
                  <Form.Label>{key}</Form.Label>
                  <Form.Control
                    type={key === "yearOfExp" ? "number" : "text"}
                    value={selectedReferal[key]}
                    onChange={(e) =>
                      setSelectedReferal({ ...selectedReferal, [key]: e.target.value })
                    }
                  />
                </Form.Group>
              ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpdateReferal}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReferalList;
