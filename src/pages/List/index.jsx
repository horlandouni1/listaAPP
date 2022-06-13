import React, { useEffect, useState } from "react";
import "./list.scss";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "../../credenciales";

import { Filter } from "../../components/Filter";
const db = getFirestore(firebaseApp);
const List = () => {
  const [lista, setLista] = useState([]);
  const [listaBuscada, setListaBuscada] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
        setListaBuscada(docs);
      } catch (error) {
        console.log("error");
      }
    };
    getLista();
  }, []);

  const filtro = (valor) => {
    const listaFiltrada = listaBuscada.filter(
      (user) =>
        user.nombre.toLowerCase().includes(valor) ||
        user.apellido.toLowerCase().includes(valor)
    );
    setLista(listaFiltrada);
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "usuarios", id));
  };
  return (
    <>
      <input
        type="text"
        className="form-control input-share-list"
        placeholder="Buscar usuario"
        onChange={(e) => {
          filtro(e.target.value);
        }}
      />
      <div className="container-list row">
        <div className="pt-4 card col-3 m-2 list-filter">
          <Filter
            listaBuscado={listaBuscada}
            setLista={setLista}
            lista={lista}
          />
        </div>
        <div className="container card col-8 lista-users">
          {lista.map((list) => (
            <div key={list.id} className="card-list row">
              <div className="col-5">
                <p>
                  <strong>Usuario:</strong> {list.apellido} {list.nombre}
                </p>
                <p>
                  <strong>Edad:</strong> {list.edad} años
                </p>
              </div>

              <div className="col-7 d-flex justify-content-center align-items-center flex-wrap">
                <button
                  className="btn btn-success m-1"
                  onClick={() => {
                    navigate(`/listDetail/${list.id}`);
                  }}
                >
                  Ver más
                </button>
                <button
                  className="btn btn-success m-1"
                  onClick={() => {
                    navigate(`/editarUser/${list.id}`);
                  }}
                >
                  Actualizar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(list.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { List };
