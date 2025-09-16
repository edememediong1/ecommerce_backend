const mongoose = require('mongoose');
const User = require("../models/User");
const bcrypt = require('bcrypt');
require("dotenv").config();




const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({ email: "admin@example.com" });

        if (!existingAdmin) {

            await User.create({
                name: "Super Admin",
                email: "admin@example.com",
                password: 'admin123',
                role: "admin"
            });

            console.log('✅ Admin user seeded successfully');
        } else {
            console.log("⚠️ Admin already exists")
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


seedAdmin();
