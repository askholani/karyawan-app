// import DomicileRepository from "../repositories/DomicileRepository";

import DomicileRepository from "../../repositories/DomicileRepository";

class DomicileService {
  constructor() {
    this.domicileRepository = new DomicileRepository();
  }

  async getProvinces() {
    try {
      return await this.domicileRepository.getProvince();
    } catch (error) {
      console.error("Error fetching provinces:", error.message);
      throw error;
    }
  }

  async getCities(provinceId) {
    if (!provinceId) throw new Error("Province ID diperlukan");
    try {
      return await this.domicileRepository.getCity(provinceId);
    } catch (error) {
      console.error("Error fetching cities:", error.message);
      throw error;
    }
  }

  async getSubdistricts(cityId) {
    if (!cityId) throw new Error("City ID diperlukan");
    try {
      return await this.domicileRepository.getSubdistrict(cityId);
    } catch (error) {
      console.error("Error fetching subdistricts:", error.message);
      throw error;
    }
  }

  async getHeadmen(subdistrictId) {
    if (!subdistrictId) throw new Error("Subdistrict ID diperlukan");
    try {
      return await this.domicileRepository.getHeadman(subdistrictId);
    } catch (error) {
      console.error("Error fetching headmen:", error.message);
      throw error;
    }
  }
}

export default DomicileService;
