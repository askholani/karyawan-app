import createApiClient from "./api";

class UserRepository {
  constructor(url) {
    this.apiClient = createApiClient(url);
    this.url = url; // Simpan URL yang diterima sebagai parameter
  }

  async createUser(user) {
    try {
      const response = await this.apiClient.post(`${this.url}/create`, user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Gagal membuat user");
    }
  }

  async updateUser(id, user) {
    try {
      const response = await this.apiClient.put(
        `${this.url}/update/${id}`,
        user
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal memperbarui user"
      );
    }
  }

  async getUser() {
    try {
      const response = await this.apiClient.get(`${this.url}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Gagal mengambil user");
    }
  }
}

export default UserRepository;
