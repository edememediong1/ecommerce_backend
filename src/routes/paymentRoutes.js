const express = require("express")
const router = express.Router();
const  { initiatePayment, verifyPayment } = require('../controllers/paymentController');
const {protect} = require("../middleware/authMiddleware");


// User must be logged  in
router.post('/initiate', protect, initiatePayment );
router.get('/verify', verifyPayment)



module.exports = router; 