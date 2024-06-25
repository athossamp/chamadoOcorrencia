
import s from './ButtonPreto.module.css'
type ButtonPretoProps = {
  nome: string,
  type: "submit" | "reset" | "button",
  onClick?: () => void
}
export default function ButtonPreto(props: ButtonPretoProps) {
  return(<button className={s.buttonPreto} 
  type={props.type} onClick={props.onClick}>
    {props.nome}</button>)
}