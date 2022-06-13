import React, { useEffect, useState } from "react";
import "./listDetail.scss";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import firebaseApp from "../../credenciales";
import { useNavigate, useParams } from "react-router-dom";
import "./listDetail.scss";
const db = getFirestore(firebaseApp);
const ListDetail = () => {
  const [user, setUser] = useState({});
  const [tiempo, setTiempo] = useState(0);
  let { idUser } = useParams();
  let navigate = useNavigate();
  const getOne = async (id) => {
    try {
      const docRef = doc(db, "usuarios", id);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
      if (
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) > 1985 &&
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) < 1990
      ) {
        setTiempo(64);
      } else if (
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) > 1990 &&
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) < 1995
      ) {
        setTiempo(67);
      } else if (
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) > 1995 &&
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) < 2000
      ) {
        setTiempo(68);
      } else if (
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) > 2000 &&
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) < 2005
      ) {
        setTiempo(70);
      } else if (
        parseInt(new Date(user.fecha_nacimiento).getFullYear()) > 2005
      ) {
        setTiempo(73);
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getOne(idUser);
    console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container container-detail-user">
      <h2>Detalles del usuario:</h2>
      <h3>Nombre: {user.nombre}</h3>
      <h3>Apellidos: {user.apellido}</h3>
      <h3>Edad: {user.edad}</h3>
      <h3>Sexo: {user.sexo}</h3>
      <h3>Fecha de nacimiento: {user.fecha_nacimiento}</h3>
      <h3>
        Fecha Probable de muerte:
        {parseInt(new Date(user.fecha_nacimiento).getFullYear()) + tiempo} -
        {parseInt(new Date(user.fecha_nacimiento).getMonth()) + 1}
      </h3>
      <button
        className="btn btn-success m-1"
        onClick={() => {
          navigate("/list");
        }}
      >
        Regresar a lista
      </button>
    </div>
  );
};

export { ListDetail };
