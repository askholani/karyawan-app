const CreateUserUseCase = require("../../domain/usecase/user/createUserUseCase");
const UserRepository = require("../../infrastructure/repositories/userRepository");
const response = require("../../tools/response");

const createUserUseCase = new CreateUserUseCase(UserRepository);

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const user = await createUserUseCase.execute(req.body);
    response(req, res, {
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await UserRepository.findAll();
    // console.log("users", users);
    response(req, res, {
      status: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    // const userId = req.params.id;
    const updatedUser = await UserRepository.update(req.body);
    response(req, res, {
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
