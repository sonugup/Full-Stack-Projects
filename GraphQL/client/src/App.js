import logo from './logo.svg';
import './App.css';
import {gql, useQuery} from "@apollo/client"

// GetTodosWithUser
const query= gql`
query GetTodosWithUser {
  getTodos {
    id
    title
    completed
    user {
      id
      name
      email
      phone
    }
  }
  
}
`

function App() {
  const {data, loading}=useQuery(query)
console.log(data)
  if(loading) <h1>Loading...</h1>
  return (
    <div className="App">
      {JSON.stringify(data)}
   <table>
    <tbody>
      {/* {
        data.getTodos.map((todo )=>(<tr key={todo.id}>
          
          <td>{todo.title}</td>
          <td> {todo?.users?.name} </td>
        </tr>))
      } */}
    </tbody>
   </table>
    </div>
  );
}

export default App;
