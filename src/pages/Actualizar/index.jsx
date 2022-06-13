import React, { useEffect, useRef, useState } from "react";
import "./actualizar.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./actualizar.scss";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import firebaseApp from "../../credenciales";
const db = getFirestore(firebaseApp);
const Actualizar = () => {
  let navigate = useNavigate();
  let { idUser } = useParams();
  const [user, setUser] = useState({});
  const form = useRef(null);
  console.log(idUser);
  const getOne = async (id) => {
    try {
      const docRef = doc(db, "usuarios", id);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getOne(idUser);
    console.log(user);
  }, []);

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
      await setDoc(doc(db, "usuarios", idUser), {
        ...usuario,
      });
      alert("El usuario se modifico correctamente");
    } catch (error) {}
    navigate("/list");
  };
  console.log(user);
  return (
    <div className="row homeContainer">
      <div className="col-md-5 mx-auto mt-5">
        <h3 className="text-center mb-3">Editar persona</h3>
        <form ref={form}>
          <div className="card card-body">
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre"
                className="form-control mb-3"
                name="nombre"
                defaultValue={user.nombre}
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                className="form-control mb-3"
                name="apellido"
                defaultValue={user.apellido}
                required
              />
              <input
                type="integer"
                placeholder="Edad"
                className="form-control mb-3"
                name="edad"
                defaultValue={user.edad}
                required
              />
              <select name="sexo" id="sexo" className="form-control mb-3">
                <option value="masculino" selected={user.sexo === "masculino"}>
                  Masculino
                </option>
                <option value="femenino" selected={user.sexo === "femenino"}>
                  Femenino
                </option>
              </select>
              <input
                type="date"
                placeholder="Fecha de Nacimiento"
                className="form-control mb-3"
                name="fecha_nacimiento"
                defaultValue={user.fecha_nacimiento}
              />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Actualizar Información
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Actualizar };
