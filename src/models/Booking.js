const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  email: { type: String, required: true, },
  room_number:{type: Number,required:true},
  check_out: {type: Date,requird:true},
  check_in: {type:Date,required:true}
});


module.exports = mongoose.model('Booking', bookingSchema);