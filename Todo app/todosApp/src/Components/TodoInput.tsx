import React, { useState } from 'react'

interface TodoProps{
  handleClick: (value:string   ) => void;
}
const TodoInput = ({handleClick}:TodoProps) => {
    // const [text, setText] = useState('')
    // const changeHandler = (e) =>{
      // setText(e.target.value)
    // }
    // const handleClick=(data) =>{
        // setText(...data, text)
    // }
  return (
    <div>
        <input type="text" placeholder='Add Todos' value=''  />
        {/* <button onClick={handleClick}>Add </button> */}
    </div>
  )
}

export default TodoInput