
import { useState, useEffect } from 'react'
import TodoInput from './TodoInput'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./todos.css"
import Button from './Button';
const Todo: React.FC= () => {
  const [todos, setTodos] = useState([])
  const [update, setUpdate] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [text, setText] = useState('')
  const [edit, setEdit] = useState(null)
  useEffect(() => {
    axios.get(`https://motionless-toad-stockings.cyclic.app/todos`)
      .then(res => setTodos(res.data.msg))
      .catch(err => console.log(err))
  }, [update])
  console.log(todos)


  const editeTodos = (id: any) => {
    axios.put(`https://motionless-toad-stockings.cyclic.app/todos/update/${id}`)
      .then(result => {
        console.log(result.data._id)
        if (result.data._id == id) {
          console.log(result.data.text)
          setToggle(false)
          setText(result.data.text)
          setEdit(id)
        }
      })
      .catch(err => console.log(err))

  }

  const deleteTodos = (id: string) => {
    axios.delete(`https://motionless-toad-stockings.cyclic.app/todos/delete/${id}`)
      .then(result => {
        console.log(result)
        setUpdate((prev) => !prev)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='main'>
      <h1>React TypeScript Todo App</h1>
      <TodoInput text={text} setText={setText} setUpdate={setUpdate} toggle={toggle} setToggle={setToggle} setTodos={setTodos} edit={edit} setEdit={setEdit} />


      <div>
        {
          todos.length === 0 ?
            <h1>No Todos Please Add Todos</h1>
            :
            todos.map((el: any) => {
              return (
                <div className='todo'>
                  <h3> 🤩 {el.text}</h3>
                  <div className='btn'>
                    <Button text={<FaEdit />} handleButton={() => editeTodos(el._id)} />
                    <Button text={<MdDelete />} handleButton={() => deleteTodos(el._id)} />
                  </div>
                </div>
              )
            })
        }
      </div>
    </div>
  )
}

export default Todo