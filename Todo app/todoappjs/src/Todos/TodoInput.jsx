import React, { useState } from 'react'
import axios from "axios"

const TodoInput = ({ setUpdate, toggle, setToggle, text, setText, todos, setTodos, edit, setEdit }) => {

  console.log(todos)
  const handleClick = () => {
    if (!text) {
      alert("plz add todos")
    }
    else if (text && !toggle) {
      axios.put(`http://localhost:3458/todos/update/${edit} `, { text: text })
        .then(res => {
          setTodos(
            res.map((ele) => {
              console.log(ele)
              if (ele._id === edit) {
                return { ...ele, text }
              }
              return ele

            })

          )
        })


      setText("")
      setToggle(true)
      setEdit(null)
      setUpdate((prev) => !prev)
    } else {
      axios.post("http://localhost:3458/todos/create", { text: text })
        .then(result => {
          setUpdate((prev) => !prev)
        })
        .catch(err => console.log(err))
      setText("")
    }

  }
  return (
    <div className='inpbox'>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='✍ Add Todos' />
      {
        toggle ? <button onClick={handleClick}>add</button> : <button onClick={handleClick}>uptate</button>
      }
      {/* <button onClick={handleClick}>Add </button> */}
    </div>
  )
}

export default TodoInput

