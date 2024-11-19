const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký
const register = async (username,email, password, phone) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email đã tồn tại');
  }

  const user = new User({username, email, password, phone });
  await user.save();
  return { message: 'Đăng ký thành công' };
};

// Đăng nhập
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email không tồn tại');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Mật khẩu không đúng');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { message: 'Đăng nhập thành công', token };
};

const startProgram = async () => {
  return {message: "Chào mừng đến với chương trình"}
}


module.exports = { register, login,startProgram };
