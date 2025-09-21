const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getMyOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');


router.post('/', protect, createOrder);
router.get('/', protect, admin, getAllOrders);
router.get('/', protect, getOrders)