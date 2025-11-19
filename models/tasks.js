/* model file */
let mongoose = require('mongoose');
// create a model class
let taskModel = mongoose.Schema(
    {
    title: String,
    description: String,
    dueDate: Date,
    status: String,
    priority: String
    },
    {
        collection: "tasks"
    }

);
module.exports = mongoose.model('Task', taskModel);