const BookingService = require('../services/BookingService');
const mqtt = require('mqtt');
const options = {
    host: '529bcfb8f2fd4065bdbcb36fdeb383ca.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'minhtuanle',
    password: 'minhtuanle'
}
const client = mqtt.connect(options);
client.on('connect', function () {
  console.log('Connected');
});

client.on('error', function (error) {
  console.log(error);
});


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

const checkInRoom = async(req,res) => {
  const {email,roomNumber,code} = req.body;
  try {
    const result = await BookingService.checkInRoom(email,roomNumber,code);
    if (result.message === "success") {
      let topic = `checkin/${roomNumber}` ;
      client.subscribe(topic);
      client.publish(topic,result.code);
      res.status(200).json({message: "Mở cửa phòng"})
    } else {
      res.status(200).json({message:"Không mở cửa phòng",result});
    }
  } catch (error) {
    res.status(400).json({message:'Lỗi server'});
  }
}

module.exports = { bookingRoom,checkInRoom }