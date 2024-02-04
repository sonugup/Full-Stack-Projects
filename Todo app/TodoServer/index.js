const express = require("express");
const dotenv = require("dotenv")
const db = require("./db/db");
const { routertodo } = require("./router/todoRouter");
const cors = require("cors")
dotenv.config();

const app = express();

app.use(cors({
    origin: "*"
}))
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Todo App")
})

app.use("/todos", routertodo)

app.listen(process.env.PORT, async () => {
    try {
        await db
        console.log("server run")
    } catch (err) {
        throw err
    }

})