const roomService = require('../services/RoomService');

const createRoom = async (req,res) => {
  const {room_number,image,desc,cost} = req.body;
  try {
    const result = await roomService.createRoom(room_number,image,desc,cost);
    res.status(200).json(result);
  } catch(error) {
    res.status(400).json({message:error.message})
  }
}

module.exports={createRoom}