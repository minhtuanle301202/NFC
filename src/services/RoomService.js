const Room = require('../models/Room');

// Đăng ký
const createRoom = async (room_number,image,desc, cost) => {
  const existingRoom = await Room.findOne({room_number});
  if (existingRoom) {
    throw new Error('Phòng đã tồn tại');
  }
  const newRoom = new Room({
    room_number,
    image,
    desc,
    cost
  });
  await newRoom.save(); 
  return {message: "Tạo phòng thành công"};
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room updated successfully', data: updatedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Error updating room', error: error.message });
  }
};

// Xóa một phòng
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error: error.message });
  }
};




module.exports = { createRoom,deleteRoom,updateRoom };

