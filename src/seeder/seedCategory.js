const mongoose = require("mongoose");
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Category = require('../models/Categories');


dotenv.config();


const seedCategory = async () => {
    try {
        await connectDB();

        const exists = await Category.findOne({ name: "Uncategorized"})
        if (exists) {
            console.log("✅ Uncategorized category already exists");
            process.exit();
        }

        await Category.create({
            name: "Uncategorized",
            description: "Default category for uncategorized products"
        });

        console.log("🎉 Uncategorized category seeded successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding category:", error.message);
        process.exit(1);
    }
}


seedCategory();
