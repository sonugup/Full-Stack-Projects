const express=require("express");
const {createServer}=require("node:http");
const path=require("path")

const app=express();
app.use(express.static("/public"))

const server=createServer(app)

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"))
})


app.listen(8090, () => console.log("server start"));