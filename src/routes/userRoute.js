const express = require('express');
const userController = require('../controllers/userController');
const bookingController = require('../controllers/BookingController');
const roomController = require('../controllers/RoomController');
const router = express.Router();


router.post('/booking',bookingController.bookingRoom)
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/data',userController.startProgram)
router.post('/createRoom',roomController.createRoom)
router.post('/checkInRoom',bookingController.checkInRoom)

module.exports = router;