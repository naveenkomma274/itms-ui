import axios from 'axios';


const BASE_URL = 'http://localhost:7777/api/tasks';

class TaskService {
    getAllTasks() {
        return axios.get(BASE_URL);
    }

    getTaskById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    addTask(task) {
        return axios.post(BASE_URL, task);
    }

    updateTask(id, task) {
        return axios.put(`${BASE_URL}/${id}`, task);
    }

    deleteTask(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    exportTasks() {
        return axios.get(`${BASE_URL}/export`, {
            responseType: 'blob', // Important to handle binary data
        });
    }

}

export default new TaskService();
