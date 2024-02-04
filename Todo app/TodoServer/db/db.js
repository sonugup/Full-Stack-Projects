const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const db = mongoose.connect(process.env.MONGO_URL)


module.exports = { db }


