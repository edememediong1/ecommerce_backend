const Product = require('../models/Product');
const Category = require('../models/Categories');
const cloudinary = require('../config/cloudinary');


// @desc Create product 
// @route POST /api/products
// @access Admin
exports.createProduct = async (req, res, next) => {
    try {
        const {name, description, price, stock, category} = req.body;

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'products'})

        const product = await Product.create({
            name,
            description,
            price,
            stock, 
            imageUrl: result.secure_url,
            category,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
}


// @desc Get all products
// @route GET /api/products
// @access Public
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        })
    } catch (error) {
        next(error)
    }
}



// @desc Get single product
// @route GET /api/products/:id
// @access Public
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if(!product){
            return res.status(404).json({ success: false, message: "Product not found"})
        }
        res.status(200).json({ success: true, data: product})
    } catch (error) {
        next(error);
    }
}


// @desc Update product
// @route PUT /api/products/:id
// @access Admin
exports.updateProduct = async (req, res, next) => {
    try {
        const updates = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found"})
        }

        res.status(200).json({ success: true, data: product});
    } catch (error){
        next(error)
    }
}


// @desc Delete product
// @route DELETE /api/products/:id
// @access Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product){
            return res.status(404).json({ success: false, message: "Product not found"})
        }
        res.status(200).json({ success: true, message: "Product deleted"})
    } catch (error) {
        next(error);
    }
}