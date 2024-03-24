import React from 'react'


interface TypeProps{
  value?:string | null
  onClick:() => void
}
const Boxs:React.FC <TypeProps> = (props) => {
  return (
    <div className='boxs' onClick={props.onClick}> {props.value} </div>
  )
}

export default Boxs