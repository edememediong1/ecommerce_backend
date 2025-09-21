const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    items : [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true},
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", 'delivered', 'cancelled'],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "failed"],
        default: "unpaid"
    },
    paymentMethod: {
        type: String,
        enum: ["Paystack", 'COD'],
        default: "Paystack"
    },
    paymentReference: { type: String }
}, { timestamps : true })


module.exports = mongoose.model("Order", orderSchema);
