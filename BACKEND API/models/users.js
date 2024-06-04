const Mongoose = require('mongoose');
let userSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 3 characters']
    }
}, { timestamps: true })

module.exports = Mongoose.model('User', userSchema);