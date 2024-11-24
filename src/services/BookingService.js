const Booking = require('../models/Booking');
const Room = require('../models/Room');


const bookingRoom = async (email, check_in, check_out) => {
  const unavailableRooms = await Booking.find({
    $or: [
      { check_in: { $lt: check_out }, check_out: { $gt: check_in } },
      { check_out: check_in }, // Trùng ngày check_out với check_in mới
      { check_in: check_out }, // Trùng ngày check_in với check_out mới
    ],
  }).distinct('room_number');

  // Tìm một phòng chưa được đặt
  const availableRoom = await Room.findOne({
    room_number: { $nin: unavailableRooms },
  });

  if (!availableRoom) {
    return { message: 'Hết phòng' };
  } else {
    const booking = new Booking({
      email,
      room_number: availableRoom.room_number,
      check_in,
      check_out,
    });
    await booking.save();
    return { booking };
  }
}



module.exports = { bookingRoom };
