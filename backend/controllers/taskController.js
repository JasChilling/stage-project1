const Task = require("../models/Task");
const Project = require("../models/Project");


exports.createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            dueDate,
            project
        } = req.body;

        // Check that the project exists
        // AND belongs to the logged-in user
        const existingProject = await Project.findOne({
            _id: project,
            owner: req.user.id
        });

        if (!existingProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            project
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




exports.getTasks = async (req, res) => {
    try {
        // First check that the project belongs
        // to the logged-in user
        const project = await Project.findOne({
            _id: req.params.projectId,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const tasks = await Task.find({
            project: req.params.projectId
        });

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check that the task's project belongs
        // to the logged-in user
        const project = await Project.findOne({
            _id: task.project,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check ownership through the project
        const project = await Project.findOne({
            _id: task.project,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check ownership through the project
        const project = await Project.findOne({
            _id: task.project,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};