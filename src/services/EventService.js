import axios from "axios";

const BASE_URL = "http://localhost:7777/api/events";

const getEvents = (searchTerm, page, size) => {
  return axios.get(`${BASE_URL}?search=${searchTerm}&page=${page}&size=${size}`);
};

const addEvent = (eventData) => {
  return axios.post(BASE_URL, eventData);
};

const updateEvent = (eventId, eventData) => {
  return axios.put(`${BASE_URL}/${eventId}`, {
    eventId, // Ensure `eventId` is included
    ...eventData,
  });
};

const deleteEvent = (eventId) => {
  return axios.delete(`${BASE_URL}/${eventId}`);
};

export default { getEvents, addEvent, updateEvent, deleteEvent };
