const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    deadline: Date,
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Assuming a Task model will be defined similarly
});

module.exports = mongoose.model('Project', projectSchema);
