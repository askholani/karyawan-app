import createApiClient from "./api";

class DomicileRepository {
  constructor(url) {
    this.apiClient = createApiClient(url);
    this.url = `/api/getwilayah?level=`;
  }

  async getProvince() {
    try {
      const response = await this.apiClient.get(`${this.url}provinsi`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data provinsi"
      );
    }
  }

  async getCity(provinceId) {
    try {
      const response = await this.apiClient.get(
        `${this.url}kabupaten&parent=${provinceId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data kota"
      );
    }
  }

  async getSubdistrict(cityId) {
    try {
      const response = await this.apiClient.get(
        `${this.url}kecamatan&parent=${cityId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data kota"
      );
    }
  }

  async getHeadman(subdistrictId) {
    try {
      const response = await this.apiClient.get(
        `${this.url}kelurahan&parent=${subdistrictId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data kota"
      );
    }
  }
}

export default DomicileRepository;
