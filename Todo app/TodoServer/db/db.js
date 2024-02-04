const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const db = mongoose.connect(process.env.MONGO_URL)
// const db = mongoose.connect("mongodb://127.0.0.1:27017/todos")



module.exports = { db }


