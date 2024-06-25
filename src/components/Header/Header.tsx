import { FaHouse } from "react-icons/fa6";
import s from "./Header.module.css";
//import { FaCalendarAlt } from "react-icons/fa";
import ButtonLaranja from "../UI/ButtonLaranja/ButtonLaranja";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();
  function handleLogout() {
    try {
      setAuthenticated(false);
      localStorage.setItem("authenticated", JSON.stringify(false));
      navigate("/login");
    } catch (error) {
      console.log("Erro de logout: ", error);
    }
  }
  return (
    <header>
      <div className={s.headerLogo}>
        <img src="icons/Logo.svg" alt="" />
      </div>
      <div className={s.headerMenu}>
        <a href="/ocorrencia/" className={s.headerMenuItem}>
          {" "}
          <FaHouse /> Home
        </a>
        <NavLink to="/monitoramento">Monitoramento</NavLink>
        {/* <a href="/ocorrencia/monitoramento" className={s.headerMenuItem}>
          {" "}
          <FaCalendarAlt /> Monitoramento
        </a> */}
        <ButtonLaranja
          onClickProps={handleLogout}
          value={
            <>
              <CiLogout /> Sair
            </>
          }
        />
      </div>
    </header>
  );
}
