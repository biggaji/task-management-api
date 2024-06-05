const Mongoose = require('mongoose');

let taskSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',

    },
    due_date: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = Mongoose.model("Task", taskSchema);