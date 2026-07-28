const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status:{
            type: String,
            enum: ['Not Started', 'In Progress', 'Completed'],
            default: 'Not Started'
        },
        deadline: {
            type: Date
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'}
        },
        {
        timestamps: true
        }
);
module.exports = mongoose.model("Project", projectSchema);