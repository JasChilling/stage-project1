const Project = require("../models/Project");
const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
    try {

        const totalProjects = await Project.countDocuments({
            owner: req.user.id
        });

        const completedProjects = await Project.countDocuments({
            owner: req.user.id,
            status: "Completed"
        });

        const activeProjects = totalProjects - completedProjects;

        // Get the IDs of the user's projects
        const userProjects = await Project.find(
            { owner: req.user.id },
            "_id"
        );

        const projectIds = userProjects.map(project => project._id);

        const totalTasks = await Task.countDocuments({
            project: { $in: projectIds }
        });

        const completedTasks = await Task.countDocuments({
            project: { $in: projectIds },
            status: "Done"
        });

        const pendingTasks = totalTasks - completedTasks;

        res.status(200).json({
            totalProjects,
            completedProjects,
            activeProjects,
            totalTasks,
            completedTasks,
            pendingTasks
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};