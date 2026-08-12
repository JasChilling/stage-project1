const express = require("express");

const protect = require("../middleware/authMiddleware");
const validation = require("../middleware/validationMiddleware");
const { projectValidation } = require("../validators/projectValidator");

const router = express.Router();

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/projectController");


/*
    CREATE PROJECT
*/
router.post(
    "/",
    protect,
    projectValidation,
    validation,
    createProject
);


/*
    GET ALL PROJECTS
*/
router.get(
    "/",
    protect,
    getProjects
);


/*
    GET ONE PROJECT
*/
router.get(
    "/:id",
    protect,
    getProjectById
);


/*
    UPDATE PROJECT
*/
router.put(
    "/:id",
    protect,
    updateProject
);


/*
    DELETE PROJECT
*/
router.delete(
    "/:id",
    protect,
    deleteProject
);


module.exports = router;