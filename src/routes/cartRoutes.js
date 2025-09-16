const express = require('express');
const router = express.Router();

const { addToCart, getCart, removeFromCart, clearCart} = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

router.get('/', protect, getCart)
router.post('/add', protect, addToCart)
router.delete('/clear', protect, clearCart)
router.delete('/remove', protect, removeFromCart);


module.exports = router;