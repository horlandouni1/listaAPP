import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseApp from "../../credenciales";
const db = getFirestore(firebaseApp);
const Home = () => {
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(form.current);
    const nombre = formData.get("nombre");
    const apellido = formData.get("apellido");
    const edad = formData.get("edad");
    const sexo = formData.get("sexo");
    const fecha_nacimiento = formData.get("fecha_nacimiento");
    const usuario = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      sexo: sexo,
      fecha_nacimiento: fecha_nacimiento,
    };
    try {
      await addDoc(collection(db, "usuarios"), {
        ...usuario,
      });
    } catch (error) {}
    navigate("/list");
  };
  const form = useRef(null);
  return (
    <div className="row homeContainer">
      <div className="col-md-5 mx-auto mt-5">
        <h3 className="text-center mb-3">Añadir persona</h3>
        <form ref={form}>
          <div className="card card-body">
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre"
                className="form-control mb-3"
                name="nombre"
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                className="form-control mb-3"
                name="apellido"
                required
              />
              <input
                type="integer"
                placeholder="Edad"
                className="form-control mb-3"
                name="edad"
                required
              />
              <select name="sexo" id="sexo" className="form-control mb-3">
                <option value="" selected disabled hidden>
                  Sexo
                </option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
              <input
                type="date"
                placeholder="Fecha de Nacimiento"
                className="form-control mb-3"
                name="fecha_nacimiento"
              />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Home };
