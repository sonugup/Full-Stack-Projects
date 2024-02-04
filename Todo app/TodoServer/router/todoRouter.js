const express = require("express");

const { getTodos, postTodos, updateTodos, deleteTodos, getidTodos } = require("../controler/todoControler");

const routertodo = express.Router();

routertodo.get("/", getTodos)

routertodo.get("/:id", getidTodos)

routertodo.post("/create", postTodos)

routertodo.put("/update/:id", updateTodos)

routertodo.delete("/delete/:id", deleteTodos)

module.exports = {
    routertodo
}
