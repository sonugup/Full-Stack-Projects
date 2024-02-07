import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import axios from 'axios'
import "./todos.css"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Todos = () => {

  const [todos, setTodos] = useState([])
  const [update, setUpdate] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [text, setText] = useState('')
  const [edit, setEdit] = useState(null)

  useEffect(() => {

    axios.get("https://motionless-toad-stockings.cyclic.app/todos")
      .then(result => setTodos(result.data.msg))
      .catch(err => console.log(err))


  }, [update])

  const editeTodos = (id) => {
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

  const deleteTodos = (id) => {
    axios.delete(`https://motionless-toad-stockings.cyclic.app/todos/delete/${id}`)
      .then(result => {
        setUpdate((prev) => !prev)
      })
      .catch(err => console.log(err))
  }
  // console.log(todos)
  // console.log(edit)
  return (
    <div className='container'>
      <h1>Todo App</h1>
      <TodoInput text={text} setText={setText} setUpdate={setUpdate} toggle={toggle} setToggle={setToggle} todos={todos} setTodos={setTodos} edit={edit} setEdit={setEdit} />
      <div>
        <p>
          {
            todos.length === 0 ?
              <div>No Todos</div>
              :
              todos.map((ele) => {
                return (
                  <div className='todo'>
                    <p>😊{ele.text}</p>
                    <div>
                      <button onClick={() => editeTodos(ele._id)}><FaEdit /></button>
                      <button onClick={() => deleteTodos(ele._id)}><MdDelete /></button>
                    </div>
                  </div>
                )

              })
          }
        </p>
      </div>
    </div>
  )
}

export default Todos