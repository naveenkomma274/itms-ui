import axios from "axios";

const BASE_URL = "http://localhost:7777/api/referals";

const ReferalService = {
  getAllReferals: (page, size, referalId, referalPosition) => {
    return axios.get(BASE_URL, {
      params: { page, size, referalId, referalPosition },
    });
  },

  addReferal: (referal) => axios.post(BASE_URL, referal),

  updateReferal: (referalId, referal) => axios.put(`${BASE_URL}/${referalId}`, referal),

  deleteReferal: (referalId) => axios.delete(`${BASE_URL}/${referalId}`),
};

export default ReferalService;