const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  room_number:{type: Number,required:true,unique:true},
  image:{type:String,required:true},
  desc:{type:String},
  cost:{type:Number}
});


module.exports = mongoose.model('Room', roomSchema);