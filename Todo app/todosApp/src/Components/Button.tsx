
interface buttonType{
    text:any,
    handleButton:() => void
}
const Button: React.FC = (props) => {
    const {handleButton, text}=props
  return (
    <div>
        <button onClick={handleButton}>{text}</button>
    </div>
  )
}

export default Button;