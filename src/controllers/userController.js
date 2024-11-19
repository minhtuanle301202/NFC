const userService = require('../services/userService');

// Đăng ký
const register = async (req, res) => {
  const { username,email, password, phone } = req.body;
  try {
    const result = await userService.register(username,email, password, phone);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const startProgram = async(req,res) => {
  try {
    const result = await userService.startProgram();
    res.status(200).json(result)
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = { register, login,startProgram };