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

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
router?.post("/", protect, projectValidation, validation, createProject);


module.exports = router;
