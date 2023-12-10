var express = require('express');

var app = express();
app.use(express.json());

var tasks = [];

app.get('/', function (req, res) {
    res.send("Hello, world!");
});

app.get("/tasks", function (req, res) {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).send("Title and description are required");
    } else {
        const id = Date.now().toString();
        const task = { id, title, description, done: false };
        tasks.push(task);

        res.json(task);
    }
});

app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, done } = req.body;
    const task = tasks.find((t) => t.id === id);

    if (!task) {
        res.status(404).send("Task not found");
    } else {
        if (title) task.title = title;
        if (description) task.description = description;
        if (done !== undefined) task.done = done;

        res.json(task);
    }
});

app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
        res.status(404).send("Task not found");
    } else {
        tasks.splice(index, 1);
        res.status(204).end();
    }
});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});