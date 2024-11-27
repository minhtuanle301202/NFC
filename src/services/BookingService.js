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
    const roomNumber = booking.room_number;
    return { roomNumber };
  }
}

const checkInRoom = async (email, roomNumber) => {
  const vietnamOffset = 7 * 60 * 60 * 1000;

  const today = new Date().getTime() + vietnamOffset;

  const bookings = await Booking.find({ email, room_number:roomNumber });

  // Kiểm tra xem có bản ghi nào ngày hôm nay nằm trong khoảng check_in và check_out hay không
  const isBooked = bookings.some(
    (booking) =>
      (new Date(booking.check_in).getTime()) <= today && (new Date(booking.check_out).getTime()) >= today
  );

  if (isBooked) {
    return {message:"success",email,roomNumber}
  } else {
    return {message: "failure"}
  }
}



module.exports = { bookingRoom,checkInRoom };
