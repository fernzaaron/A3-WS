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
                res.render('Tasks/list',{
                    error: 'Error on server'
                })
        }
});
//Get route for displaying the add page
router.get('/add', (req, res, next) => {
    try {
                // Render the existing top-level add.ejs so /tasks/add works
                res.render('add', { title: 'Add a Task' });
    }
    catch (err) {
                console.error(err);
                res.render('Tasks/list',{
                    error: 'Error on server'
                })
        }
});
//Post route for processing the add page
router.post('/add', (req, res, next) => {
    try 
    {
        let newTask = Task({
            "title": req.body.title,
            "description": req.body.description,
            "dueDate": req.body.dueDate,
            "status": req.body.status,
            "priority": req.body.priority
        });
        Task.create(newTask).then(()=>{
            res.redirect('/tasks');
        });

    }
    catch (err) {
        console.error(err);
        res.render('Tasks/list',{
            error: 'Error on server'
        })
    }

});
//Get route for displaying the edit page
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const taskToEdit = await Task.findById(id);
        if (!taskToEdit) {
            return res.status(404).render('Tasks/list', { title: 'Tasks', error: 'Task not found' });
        }
        res.render('edit', { title: 'Edit Task', task: taskToEdit });
    }
    catch (err) {
        console.log(err);
        next(err);
    }

});
// Post route for processing the edit page - Update operation
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updateTask = Task({
            "_id": id,
            "title": req.body.title,
            "description": req.body.description,
            "dueDate": req.body.dueDate,
            "status": req.body.status,
            "priority": req.body.priority
        });
        await Task.findByIdAndUpdate(id, updateTask);
        res.redirect('/tasks');
    }
    catch (err) {
        console.log(err);
        next(err);
    }

});
// Get route to perform delete operation - Delete operation
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Task.deleteOne({ _id: id });
        res.redirect('/tasks');
    }
    catch (err) {
        console.log(err);
        next(err);
    }

});
module.exports = router;