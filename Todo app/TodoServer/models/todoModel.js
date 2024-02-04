const mongoose = require("mongoose");


const todoSchema = mongoose.Schema({
    text: String,
    status: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", todoSchema)

module.exports = {
    TodoModel
}