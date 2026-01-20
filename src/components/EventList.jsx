import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import EventService from "../services/EventService";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    eventId: "",
    eventName: "",
    eventDetails: "",
    eventDate: "",
    eventHost: "",
    eventMembers: "",
    eventContact: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    EventService.getEvents(searchTerm, 0, 10)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleSearch = () => {
    fetchEvents();
  };

  const handleAddOrUpdateEvent = () => {
    const payload = {
      eventId: eventData.eventId, //  Ensure eventId is included
      eventName: eventData.eventName,
      eventDetails: eventData.eventDetails,
      eventDate: eventData.eventDate,
      eventHost: eventData.eventHost,
      eventMembers: eventData.eventMembers.split(","), //  Convert string to array
      eventContact: eventData.eventContact,
    };
  
    if (eventData.eventId) {
      EventService.updateEvent(eventData.eventId, payload)
        .then(() => {
          fetchEvents();
          setShowModal(false);
        })
        .catch((error) => console.error("Error updating event:", error));
    } else {
      EventService.addEvent(payload)
        .then(() => {
          fetchEvents();
          setShowModal(false);
        })
        .catch((error) => console.error("Error adding event:", error));
    }
  };
  

  const handleDeleteEvent = (eventId) => {
    EventService.deleteEvent(eventId)
      .then(() => fetchEvents())
      .catch((error) => console.error("Error deleting event:", error));
  };

  const handleEditEvent = (event) => {
    setEventData({ ...event, eventMembers: event.eventMembers.join(", ") });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2>Event List</h2>
      
      {/* Search Bar */}
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Search by event name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
        />
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </div>

      {/* Add Event Button */}
      <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
        Add Event
      </Button>

      {/* Event Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Date</th>
            <th>Host</th>
            <th>Members</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.eventId}>
              <td>{event.eventId}</td>
              <td>{event.eventName}</td>
              <td>{event.eventDetails}</td>
              <td>{event.eventDate}</td>
              <td>{event.eventHost}</td>
              <td>{event.eventMembers.join(", ")}</td>
              <td>{event.eventContact}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditEvent(event)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteEvent(event.eventId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Event Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{eventData.eventId ? "Edit Event" : "Add Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event ID</Form.Label>
              <Form.Control
                type="text"
                value={eventData.eventId}
                onChange={(e) => setEventData({ ...eventData, eventId: e.target.value })}
                disabled={!!eventData.eventId} // Disable for existing events
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={eventData.eventName}
                onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={eventData.eventDetails}
                onChange={(e) => setEventData({ ...eventData, eventDetails: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={eventData.eventDate}
                onChange={(e) => setEventData({ ...eventData, eventDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Host</Form.Label>
              <Form.Control
                type="text"
                value={eventData.eventHost}
                onChange={(e) => setEventData({ ...eventData, eventHost: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Members (comma separated)</Form.Label>
              <Form.Control
                type="text"
                value={eventData.eventMembers}
                onChange={(e) => setEventData({ ...eventData, eventMembers: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={eventData.eventContact}
                onChange={(e) => setEventData({ ...eventData, eventContact: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddOrUpdateEvent}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventList;
