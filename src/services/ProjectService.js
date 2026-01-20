import axios from 'axios';

const BASE_URL = 'http://localhost:7777/api/projects';

const ProjectService = {
  getAllProjects: (page, size, projectRole, skillSetNeeded) => {
    return axios.get(BASE_URL, {
      params: { page, size, projectRole, skillSetNeeded },
    });
  },

  addProject: (project) => {
    return axios.post(BASE_URL, project);
  },

  updateProject: (projectId, project) => {
    return axios.put(`${BASE_URL}/${projectId}`, project);
  },

  deleteProject: (projectId) => {
    return axios.delete(`${BASE_URL}/${projectId}`);
  },
};

export default ProjectService;
