import React, { useState, useContext } from "react";
import "./header.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../context/AppContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import firebaseApp from "../../credenciales";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const auth = getAuth(firebaseApp);
const Header = () => {
  const { state, saveState } = useContext(AppContext);
  const [menuNav, setMenuNav] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const closeLogin = () => {
    const newState = {
      ...state,
      email: "",
      password: "",
      auth: false,
    };
    console.log(state.auth);
    saveState(newState);
    auth.signOut();
  };
  return (
    <nav>
      <div className="navbar-left">
        <div className="container-icon-nav">
          <FontAwesomeIcon
            icon={faBars}
            className="menu-icono-header"
            onClick={() => setMenuNav(!menuNav)}
          />
          {menuNav && (
            <div className="menu-nav">
              <ul>
                <li onClick={() => navigate("/")}>Añadir persona</li>
                <li onClick={() => navigate("/list")}>Lista de clientes</li>
              </ul>
            </div>
          )}
        </div>

        <ul>
          <li>
            <span>
              <NavLink
                exact="true"
                activeclassname="active"
                className="link"
                to="/"
              >
                Añadir persona
              </NavLink>
            </span>
          </li>
          <li>
            <span>
              <NavLink
                exact="true"
                activeclassname="active"
                className="link"
                to="/list"
              >
                Lista de clientes
              </NavLink>
            </span>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul className="container-menu-logout">
          <span
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <li className="navbar-email">Bienvenido {state.email}</li>
            <FontAwesomeIcon icon={faUser} className="logo-user" />
          </span>
          {menu && (
            <div className="menu-close-login">
              <ul>
                <li onClick={closeLogin}>cerrar sesion</li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
