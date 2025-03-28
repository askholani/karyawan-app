import { UserValidationSchema } from "../../helpers/validation";
import User from "../entities/UserEntity";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(userData) {
    try {
      await UserValidationSchema.validate(userData, { abortEarly: false });
      const user = new User(userData);
      return await this.userRepository.createUser(user);
    } catch (error) {
      throw new Error(error.errors ? error.errors.join(", ") : error.message);
    }
  }

  async get() {
    return await this.userRepository.getUser();
  }

  async update(id, userData) {
    try {
      await UserValidationSchema.validate(userData, { abortEarly: false });
      const user = new User(userData);
      return await this.userRepository.updateUser(id, user);
    } catch (error) {
      throw new Error(error.errors ? error.errors.join(", ") : error.message);
    }
  }

  async deleteUser(id) {
    return await this.userRepository.deleteUser(id);
  }
}

export default UserService;
