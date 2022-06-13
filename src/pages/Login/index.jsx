import React, { useRef, useContext, useState } from "react";
import "./Login.scss";
import AppContext from "../../context/AppContext";

import { useNavigate } from "react-router-dom";
import firebaseApp from "../../credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const autenticacion = getAuth(firebaseApp);
const Login = () => {
  const [registro, setRegistro] = useState(false);
  const form = useRef(null);
  const { state, saveState } = useContext(AppContext);
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);

    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email);
    console.log("asd");
    if (registro) {
      await createUserWithEmailAndPassword(autenticacion, email, password);
      const newState = {
        ...state,
        email: email,
        password: password,
        auth: true,
      };
      saveState(newState);
      navigate("/");
    } else {
      await signInWithEmailAndPassword(autenticacion, email, password);
      console.log("entraste");
      const newState = {
        ...state,
        email: email,
        password: password,
        auth: true,
      };
      saveState(newState);
      navigate("/");
    }

    // if (data.useEmail === "promart@gmail.com" && data.password === "123456") {
    //   const newState = {
    //     ...state,
    //     email: data.useEmail,
    //     password: data.password,
    //     auth: true,
    //   };
    //   saveState(newState);
    //   setStart(true);
    //   navigate("/");
    // } else {
    //   const newState = { ...state, email: "", password: "", auth: false };
    //   saveState(newState);
    //   setStart(false);
    // }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        {!registro ? <h2>Inicia sesión</h2> : <h2>Crear Cuenta</h2>}

        <form action="/" className="form" ref={form}>
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            placeholder="horlando@gmail.com"
            className="input input-email"
            required
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="input input-password"
            required
          />
          <button
            onClick={handleSubmit}
            className="primary-button login-button"
          >
            {registro ? "Sign up" : "Log in"}
          </button>
          <span
            onClick={() => {
              setRegistro(!registro);
            }}
          >
            {registro
              ? "Ya tienes una cuenta? logueate"
              : "no tienes una cuenta? registrate"}
          </span>
        </form>
      </div>
    </div>
  );
};

export { Login };
