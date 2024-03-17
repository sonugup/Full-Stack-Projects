const express = require("express");

const { ApolloServer } = require("@apollo/server")

const { exprssMiddleware } = require("@apollo/server/errors");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

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
            completed:boolean
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
                    User: async (todo) => 
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data
            },
            Query: {
                getTodos: async () => (
                    await axios.get(`https://jsonplaceholder.typicode.com/todos`)
                ).data,
                getAllUser: async () => (await axios.get(`https://jsonplaceholder.typicode.com/users`)).data,
                getUser: async (parent, {id}) => (
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
                )
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors);

    await server.start()
    app.use("graphql", exprssMiddleware(server))

    app.listen(8000, () => console.log("server started"))
}

startServer();

// let https://jsonplaceholder.typicode.com/todos