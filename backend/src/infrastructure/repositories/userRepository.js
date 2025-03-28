const UserEntity = require("../../domain/entities/UserEntity");
const { db } = require("../../../config/sequelize");
const { userValidation } = require("../../tools/validation");

class UserRepository {
  constructor() {
    this.model = db.postgres.user;
  }

  async create(userData) {
    try {
      console.log("userData", userData);
      await userValidation.validate(userData, { abortEarly: false });

      const mappedData = {
        full_name: userData.fullName,
        ktp: userData.ktp,
        gender: userData.gender,
        birth_place: userData.birthPlace,
        birth_date: new Date(userData.birthDate).toISOString().split("T")[0],
        phone: userData.phone,
        province: userData.province,
        city: userData.city,
        subdistrict: userData.subdistrict,
        headman: userData.headman,
        email: userData.email,
        password: userData.password,
        roles: JSON.stringify(userData.role),
        start_contract: new Date(userData.startContract)
          .toISOString()
          .split("T")[0],
        end_contract: new Date(userData.endContract)
          .toISOString()
          .split("T")[0],
        address: userData.address,
        bpjs_code: userData.bpjsCode,
        martial: userData.martial,
        is_activated: userData.isActive ?? true,
      };

      const user = await this.model.create(mappedData);
      return new UserEntity(user);
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation Errors:", error.errors);
        throw new Error(`Validation failed: ${error.errors.join(", ")}`);
      } else if (error.name === "SequelizeValidationError") {
        console.error("Database Validation Errors:", error.errors);
        throw new Error(
          `Database validation failed: ${error.errors
            .map((e) => e.message)
            .join(", ")}`
        );
      }
      console.error("Database Error:", error);
      throw new Error(error.message || "Database error");
    }
  }

  async findAll() {
    try {
      const users = await this.model.findAll();
      // console.log("users", users);

      return users.map((user) => {
        return new UserEntity({
          fullName: user.full_name, // Pastikan sesuai dengan field di DB
          ktp: user.ktp,
          username: user.username,
          gender: user.gender,
          birthPlace: user.birth_place,
          birthDate: user.birth_date ? new Date(user.birth_date) : undefined,
          phone: user.phone,
          province: user.province,
          city: user.city,
          subdistrict: user.subdistrict,
          headman: user.headman,

          email: user.email,
          password: user.password,
          role: user.roles ? JSON.parse(user.roles) : [], // Convert JSON ke array
          startContract: user.start_contract
            ? new Date(user.start_contract)
            : undefined,
          endContract: user.end_contract
            ? new Date(user.end_contract)
            : undefined,
          address: user.address,
          bpjsCode: user.bpjs_code,
          martial: user.martial,
          isActive: user.is_activated ?? true,
        });
      });
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error(error.message || "Database error");
    }
  }

  async update(userId, userData) {
    try {
      await userValidation.validate(userData, { abortEarly: false });

      const mappedData = {
        full_name: userData.fullName,
        ktp: userData.ktp,
        username: userData.username,
        gender: userData.gender,
        birth_place: userData.birthPlace,
        birth_date: new Date(userData.birthDate).toISOString().split("T")[0],
        phone: userData.phone,
        province: userData.province,
        city: userData.city,
        subdistrict: userData.subdistrict,
        headman: userData.headman,
        email: userData.email,
        password: userData.password,
        roles: JSON.stringify(userData.role),
        start_contract: new Date(userData.startContract)
          .toISOString()
          .split("T")[0],
        end_contract: new Date(userData.endContract)
          .toISOString()
          .split("T")[0],
        address: userData.address,
        bpjs_code: userData.bpjsCode,
        martial: userData.martial,
        is_activated: userData.isActive ?? true,
      };

      const user = await this.model.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      await user.update(mappedData);
      return new UserEntity(user);
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation Errors:", error.errors);
        throw new Error(`Validation failed: ${error.errors.join(", ")}`);
      } else if (error.name === "SequelizeValidationError") {
        console.error("Database Validation Errors:", error.errors);
        throw new Error(
          `Database validation failed: ${error.errors
            .map((e) => e.message)
            .join(", ")}`
        );
      }
      console.error("Database Error:", error);
      throw new Error(error.message || "Database error");
    }
  }
}

module.exports = new UserRepository();
