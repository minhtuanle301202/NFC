const BookingService = require('../services/BookingService');

const bookingRoom = async (req, res) => {
  const { email, check_in, check_out } = req.body;
  try {
    const result = await BookingService.bookingRoom(email, check_in, check_out);
    if (result.message == 'Hết phòng') {
      res.status(400).json({ message: 'Không còn phòng nào trống' });
    } else {
      res.status(200).json({ roomNumber: result.roomNumber, message: "Đặt phòng thành công" });
    }

  } catch (error) {
    res.status(400).json({ message: 'Đặt phòng bị lỗi' });
  }
}

const register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const result = await userService.register(username, email, password, phone);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { bookingRoom }