const Order = require("../models/Order");


exports.createOrder = async (req, res, next) => {
    try {
        const { items, totalAmount, paymentMethod } = req.body;

        if (!items || items.length === 0){
            return res.status(400).json({ message: "No items in order"})
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount, 
            paymentMethod
        });

        res.status(201).json({
            success: true, 
            message: "Order created successfully",
            order
        });
    } catch (err) {
        next(err)
    }
}

//Get all Orders (admin only)
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.json({ success: true, orders });
    } catch (err) {
        next(err);
    }
}


// Get logged in user's orders
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id});
        res.json({ success: true, orders })
    } catch (err) {
        next(err);
    }
}



