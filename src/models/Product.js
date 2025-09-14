const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },
        description: {
            type: String, 
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        },
        stock: {
            type: Number,
            default: 0,
        },
        imageUrl: {
            type: String, //Cloudinary URL
            required: [true, "Product image is required"]
        },
        category: {
            type: mongoose.Schema.ObjectId, 
            ref: "category", 
            default: async function () {
                const Category = mongoose.model('category');
                const uncategorized = await Category.findOne({ name: "Uncategorized"});
                return uncategorized ? uncategorized._id : null;
            }
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", //The admin who created it
        }
    },
    { 
        timestamps: true
    }
);


module.exports = mongoose.model('Product', productSchema);