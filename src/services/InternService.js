import axios from 'axios';

const BASE_URL = 'http://localhost:7777/api/interns';

const InternService = {
  getAllInterns: () => axios.get(BASE_URL),
  
  addIntern: (internData) => axios.post(BASE_URL, internData),

  updateIntern: (id, internData) => axios.put(`${BASE_URL}/${id}`, internData),

  deleteIntern: (id) => axios.delete(`${BASE_URL}/${id}`),
};

export default InternService;
