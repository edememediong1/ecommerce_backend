const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name must be less than 50 characters"] 
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a passord"],
        minlength: [6, "Minimum password length is 6 characters"]
    },
    role : {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps : true})



userSchema.post('save', function (doc, next) {
    console.log('New user was created & saved', doc);
    next();
})


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();  //review this
    console.log('User about to created and saved', this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};


module.exports = mongoose.model('user', userSchema)