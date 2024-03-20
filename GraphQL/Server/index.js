const express = require("express");

const { ApolloServer } = require("@apollo/server")
const {expressMiddleware}=require("@apollo/server/express4")
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const {USERS} =require("./data/users")
const {TODOS} =require("./data/todos")

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `

        type User {
            id:ID!
            name:String!
            email:String!
            phone:String!
        }
        type Todo {
            id:ID!
            title:String!
            completed:Boolean
            user:User
        }

        type Query {
            getTodos:[Todo]
            getAllUsers:[User]
            getUser(id:ID!):User
        }
        `,
        resolvers: {
            Todo :{
                    user:  (todo) =>  USERS.find((e) => e.id === todo.id),
                    // (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data
            },
            Query: {
                getTodos:  () => TODOS,
                // (
                    // await axios.get(`https://jsonplaceholder.typicode.com/todos`)
                // ).data,
                getAllUsers:  () => USERS,
                // (await axios.get(`https://jsonplaceholder.typicode.com/users`)).data,
                getUser: async (parent, {id}) => USERS.find((e) => e.id === id),
                // (
                    // (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
                // )
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start()
    app.use("/graphql", expressMiddleware(server))

    app.listen(8080, () => console.log("server started"))
}

startServer();

// let https://jsonplaceholder.typicode.com/todos