const axios = require("axios");
const Order = require("../models/Order");


//Initiate Payment with Paystack
exports.initiatePayment = async (req, res, next) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById(orderId).populate("user", "email")
        
        if (!order) return res.status(404).json({ message: "Order not found"})

        if (order.paymentStatus === "paid") {
            return res.status(400).json({ message: "Order already paid" });
        }

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email: order.user.email,
                amount: order.totalAmount * 100, //in kobo
                metadata: { orderId: order._id.toString()}
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content Type": "application/json"
                }
            }
        );

        order.paymentReference = response.data.data.reference;
        await order.save();

        res.status(200).json({
            success: true,
            authorization_url: response.data.data.authorization_url,
            reference: response.data.data.reference
        });
    } catch (err) {
        next(err)
    }
}


exports.verifyPayment = async (req, res, next) => {
    try {
        const { reference } = req.query;

        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
            }
        );


        const { status, metadata } = response.data.data;
        const order = await Order.findById(metadata.orderId);


        if (!order) return res.status(404).json({ message: "Order not found"})

        if (status === "success") {
            order.paymentStatus = "paid";
            await order.save();
            return res.json({ success: true, message: "Payment verified", order})
        } else {
            order.paymentStatus = 'failed';
            await order.save();
            return res.status(400).json({ success: false, message: "Payment failed"})
        }

    } catch (err) {
        next(err)
    }
}