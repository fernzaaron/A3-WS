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
router.get('/edit/:id', (req, res, next) => {

});
//post route for processing the edit page
router.post('/edit/:id', (req, res, next) => {

});
//Get to perform deletion
router.get('/delete/:id', (req, res, next) => {
});
module.exports = router;