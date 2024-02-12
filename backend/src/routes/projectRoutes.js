const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Project = require('../models/Project');

// Use authenticate middleware to protect the route
router.get('/', authenticate, async (req, res) => {
    const projects = await Project.find().catch(err => res.status(500).send(err));
    res.json(projects);
});

// Example of using both authenticate and authorize middleware
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
    const project = new Project(req.body);
    const savedProject = await project.save().catch(err => res.status(400).send(err));
    res.status(201).json(savedProject);
});

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new project
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

// GET a single project by ID
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

// UPDATE a project
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a project
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
