const bcrypt = require("bcrypt");

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hashedPassword,
    };
    return this.userRepository.create(userData);
  }
}

module.exports = CreateUserUseCase;
