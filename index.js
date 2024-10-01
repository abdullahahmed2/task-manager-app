const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = []; // Placeholder for tasks

// Create a task
app.post('/tasks', (req, res) => {
    const { title, priority, dueDate } = req.body;
    const task = { id: tasks.length + 1, title, priority, dueDate, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

// Read all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, priority, dueDate, completed } = req.body;

    const task = tasks.find(t => t.id == id);
    if (task) {
        task.title = title || task.title;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;
        task.completed = completed !== undefined ? completed : task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.status(204).end();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
