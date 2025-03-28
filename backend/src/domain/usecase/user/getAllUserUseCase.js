class getAllUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      throw new Error("Error retrieving users: " + error.message);
    }
  }
}
