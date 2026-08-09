const Project = require("../models/Project");
exports.createProject = async (req, res) => {
    try {

        const {
            title,
            description,
            status,
            priority,
            deadline
        } = req.body;

        const project = await Project.create({
            title,
            description,
            status,
            priority,
            deadline,
            owner: req.user.id
        });

        res.status(201).json(project);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getProjects = async (req, res) => {

    try {

        const { search } = req.query;

        let filter = {
            owner: req.user.id
        };

        // If the user typed something in the search bar
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        const projects = await Project.find(filter);

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getProjectById = async (req, res) => {

    try {

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!project) {

            return res.status(404).json({
                message: "Project not found"
            });

        }

        res.json(project);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.updateProject = async (req, res) => {

    try {

        const project = await Project.findOneAndUpdate(

            {
                _id: req.params.id,
                owner: req.user.id
            },

            req.body,

            {
                new: true
            }

        );

        if (!project) {

            return res.status(404).json({
                message: "Project not found"
            });

        }

        res.json(project);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.deleteProject = async (req, res) => {

    try {

        const project = await Project.findOneAndDelete({

            _id: req.params.id,
            owner: req.user.id

        });

        if (!project) {

            return res.status(404).json({
                message: "Project not found"
            });

        }

        res.json({

            message: "Project deleted successfully"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};