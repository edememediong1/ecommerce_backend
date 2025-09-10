const { Router } = require('express')
const {createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, adminOnly } = require("../middlewares/authMiddleware");


const router = Router()

// Public
router.get('/', getCategories)


//Admin only
router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);


module.exports = router;