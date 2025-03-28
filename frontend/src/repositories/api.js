import axios from "axios";

const createApiClient = (baseURL) => {
  return axios.create({
    baseURL, // Base URL ditentukan saat instansiasi
    timeout: 5000, // Timeout request
  });
};

export default createApiClient;
