const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    salary: Number,
    isActive: Boolean,
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userModel)
