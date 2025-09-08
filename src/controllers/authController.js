const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc Register user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists"});

        user = await User.create({ name, email, password })

        // Generate JWT and set cookie
        const token = generateToken(user._id, user.role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}


module.exports = { registerUser}