const { body } = require("express-validator");

exports.projectValidation = [

    body("title")
        .notEmpty()
        .withMessage("Project title is required")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters"),

    body("status")
        .optional()
        .isIn(["Planning","In Progress","Completed"])
        .withMessage("Invalid status"),

    body("priority")
        .optional()
        .isIn(["Low","Medium","High"])
        .withMessage("Invalid priority")

];