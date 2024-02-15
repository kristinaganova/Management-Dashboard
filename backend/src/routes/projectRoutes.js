const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Project = require('../models/Project');

router.get('/', authenticate, async (req, res) => {
    const projects = await Project.find().catch(err => res.status(500).send(err));
    res.json(projects);
});

router.post('/', authenticate, authorize(['admin']), async (req, res) => {
    const project = new Project(req.body);
    const savedProject = await project.save().catch(err => res.status(400).send(err));
    res.status(201).json(savedProject);
});

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status,
    });
    
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.remove();
            res.json({ message: 'Deleted Project' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
