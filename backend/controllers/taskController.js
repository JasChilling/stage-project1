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

        const tasks = await Task.find({
            project: req.params.projectId
        });

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.deleteTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};