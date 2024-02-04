const { TodoModel } = require("../models/todoModel");

const getTodos = async (req, res) => {
    const todos = await TodoModel.find()
    console.log(todos)
    res.json({ msg: todos })
}

const getidTodos = async (req, res) => {
    const todos = await TodoModel.findById()
    console.log(todos)
    res.json({ msg: todos })
}

const postTodos = async (req, res) => {
    const text = req.body
    try {
        const todo = new TodoModel(text)
        await todo.save()
        console.log(todo)
        res.json({ msg: todo })
    } catch (err) {
        res.send("some error")
        console.log(err)
    }
}

const updateTodos = async (req, res) => {
    const id = req.params.id;
    const todo = req.body
    try {
        const todos = await TodoModel.findByIdAndUpdate({ _id: id }, todo, {
            returnDocument: "after"
        });
        res.send(todos)
    } catch (err) {
        console.log(err)
        res.send("something rwong in update")
    }
}

const deleteTodos = async (req, res) => {
    const id = req.params.id;

    try {
        await TodoModel.findByIdAndDelete({ _id: id });
        res.send("delete")
    } catch (err) {
        console.log(err)
        res.send("something rwong in delete")
    }
}


module.exports = {
    getTodos,
    getidTodos,
    postTodos,
    updateTodos,
    deleteTodos
}