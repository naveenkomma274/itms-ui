import axios from "axios";

const BASE_URL = "http://localhost:7777/api/committees";

const getCommittees = (searchTerm, page, size) => {
  return axios.get(`${BASE_URL}?search=${searchTerm}&page=${page}&size=${size}`);
};

const addCommittee = (committeeData) => {
  return axios.post(BASE_URL, committeeData);
};

const updateCommittee = (commID, committeeData) => {
  return axios.put(`${BASE_URL}/${commID}`, committeeData);
};

const deleteCommittee = (commID) => {
  return axios.delete(`${BASE_URL}/${commID}`);
};

export default { getCommittees, addCommittee, updateCommittee, deleteCommittee };
