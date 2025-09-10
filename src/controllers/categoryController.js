const Category = require('../models/Categories');

// @desc Create a category (Admin)
// @route POST /api/categories
// @access Admin
const createCategory = async (req, res, next) => {
    try {
         const {name, description} = req.body;

         const exists = await Category.findOne({ name });
         if (exists) {
            res.status(400);
            throw new Error("Category already exists");
         }


         const category = await Category.create({ name, description });
         res.status(201).json(category)
    } catch (err) {
        next(err);
    }
};



// @desc Get all categories 
// @route Get /api/categories
// @access Public
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        next(err)
    }
}


// @desc Update a category (Admin)
// @route PUT /api/categories/:id
// @access Admin
const updateCategory = async (req, res, next) => {
    try {
        const {name, description} = req.body

        const category = await Category.findById(req.params.id);
        if(!category) {
            res.status(404);
            throw new Error("Category not found")
        }

        category.name = name || category.name;
        category.description = description || category.description

        const updated = await category.save();
        res.json(updated);
    } catch (err) {
        next(err)
    }
}


// @desc Delete a category (Admin)
// @route DELETE /api/categories/:id
// @access Admin
const  deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404);
            throw new Error("Category not found");
        }

        await category.deleteOne();
        res.json({ message: 'Category removed'})
    } catch (err) {
        next(err);
    }

}


module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}