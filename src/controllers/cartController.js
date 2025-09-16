const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add item to cart 
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, qty } = req.body;
        const userId = req.user._id

        //Checking if the user has a cart in the Cart Database
        let cart = await  Cart.findOne({ user: userId});

        // If cart doesn't exist, create a new cart for a particular user
        if (!cart) {
            cart = new Cart({ user: userId, items: []})
        }

        //If the cart exist, Check if the product is already in cart 
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );
        
        if (itemIndex > -1) {
            // If exist, update qty 
            cart.items[itemIndex].qty += qty || 1;
        } else {
            // If not, push new item
            cart.items.push({ product: productId, qty: qty || 1})
        }


        await cart.save();
        res.status(200).json({ success: true, cart })
    } catch (error) {
        next(error);
    }
}


// Get user cart
exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product",
            "name price image"
        )
        res.status(200).json({ success: true, cart })
    } catch (error) {
        next(error);
    }
   
}


// Remove item from cart 
exports.removeFromCart = async (req, res, next) => {
    try {
        const {productId} = req.body;

        //Check if the user has a cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ message: "Cart not found"});

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();
        res.status(200).json({ success: true, cart})

    } catch (error) {
        next(error)
    }
}



// Clear Cart 
exports.clearCart = async (req, res, next) => {
    try {
     await Cart.findOneAndUpdate(
        { user: req.user._id },
        { items: []},
        { new: true }
     );
     res.status(200).json({ success: true, message: "Cart cleared"})   
    } catch (error) {
        next(error);
    }
}