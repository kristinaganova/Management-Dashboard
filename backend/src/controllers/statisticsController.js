const Task = require('../models/Task');

exports.getTotalTasks = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        res.json({ totalTasks });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCompletedTasks = async (req, res) => {
    try {
        const completedTasks = await Task.countDocuments({ status: 'Completed' });
        res.json({ completedTasks });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
