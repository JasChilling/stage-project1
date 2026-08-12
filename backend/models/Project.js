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
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium'
      },

        deadline: {
            type: Date
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
        }
);
module.exports = mongoose.model("Project", projectSchema);