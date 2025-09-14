const express = require("express");
const upload = require('../config/multer')

const { createProduct, getProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/productController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');


const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin-only
router.post("/", protect, adminOnly, upload.single('image'), createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;