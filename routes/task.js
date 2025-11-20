let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
/* CRUD operations for tasks */
let Task = require('../models/tasks');

/* GET all tasks */
router.get('/', async (req, res, next) => {
        try {
                const TaskList = await Task.find();
                // provide both `tasks` and `TaskList` so templates using either name work
                res.render('Tasks/list', { title: 'Tasks', tasks: TaskList, TaskList: TaskList });
        } catch (err) {
                console.error(err);
                return res.status(500).render('error', { title: 'Error', message: 'Failed to fetch tasks' });
        }
});

module.exports = router;