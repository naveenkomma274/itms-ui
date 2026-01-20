import axios from 'axios';

const BASE_URL = 'http://localhost:7777/api/trainings';

const TrainingService = {
  getAllTrainings: () => axios.get(BASE_URL),
  addTraining: (trainingData) => axios.post(BASE_URL, trainingData),
  updateTraining: (id, trainingData) => axios.put(`${BASE_URL}/${id}`, trainingData),
  deleteTraining: (id) => axios.delete(`${BASE_URL}/${id}`),
};

export default TrainingService;