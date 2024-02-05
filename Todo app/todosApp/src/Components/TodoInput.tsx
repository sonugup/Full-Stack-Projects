
import { FaEdit } from 'react-icons/fa';
import Button from './Button';
import axios from 'axios';
import { FaArrowsToDot } from 'react-icons/fa6';

interface textType {
  text: string,
  setText: any,
  toggle: boolean,
  edit: null,

  setUpdate: any,
  setToggle: any,
  setTodos: any,
  setEdit: any
}

const TodoInput = (props: textType) => {
  const { setUpdate, toggle, setToggle, text, setText,  setTodos, edit, setEdit } = props;
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value)
  }
  const handleButton = () => {

    
    if (!text) {
      alert("plz add todos")
    }
    else if (text && !toggle) {
      axios.put(`http://localhost:3458/todos/update/${edit} `, { text: text })
        .then(result => {
          setTodos(
            result.map((ele:any) => {
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
      setUpdate((prev:any) => !prev)
    } else {
      axios.post("http://localhost:3458/todos/create", { text: text })
        .then(result => {
          console.log(result)
          setUpdate((prev:any) => !prev)
        })
        .catch(err => console.log(err))
      setText("")
    }
  }
  return (
    <div className='inpbox'>
      <input type="text" placeholder='✍ Add Todos...' value={text} onChange={handleChange} />
      {
        toggle ? <Button text={<FaArrowsToDot />} handleButton={() => handleButton()} /> : <Button text={<FaEdit />} handleButton={() => handleButton()} />
      }
    </div>
  )
}

export default TodoInput