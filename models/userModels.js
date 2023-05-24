const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your name!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        //password won't be included when we get the users
        select: false,
    },
    passwordConfirm: {
        type : String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Password are not the same',
        },
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
})

// encrypt the password 
userSchema.pre('save', async function (next) {
    // Only run this  funcntion if password was actually modified
    if (!this.isModified('password')) return next()

    // Hash the password with cost of 12 (cost parameter -> btw 4 to 31)
    this.password = await bcrypt.hash(this.password, 12)
    // Delete passwordConfirm field
    this.passwordConfirm = undefined
    next()
})

// Add Hashing to the Update of Password
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if(
        update.password !== '' &&
        update.password !== undefined &&
        update.password == update.passwordConfirm) {
        
        // Hash the password with cost 12
        this.getUpdate().password = await bcrypt.hash(update.password, 12)

        update.passwordConfirm = undefined
        next()
        }else
        next()

})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword,
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User



