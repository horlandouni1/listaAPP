import React, { useState } from "react";
import "./filter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Filter = ({ listaBuscado, setLista, lista }) => {
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menuContainerFilter, setMenuContainerFilter] = useState(false);
  const [promedio, setPromedio] = useState(0);
  const [desviacion, setDesviacion] = useState(0);
  const seleccionarMayorEdad = (valor) => {
    const usuariosFiltrados = listaBuscado.filter(
      (usuario) => usuario.edad >= valor
    );
    setLista(usuariosFiltrados);
  };
  const seleccionarMenorEdad = (valor) => {
    const usuariosFiltrados = listaBuscado.filter(
      (usuario) => usuario.edad < valor
    );
    setLista(usuariosFiltrados);
  };
  const seleccionarSexo = (valor) => {
    const usuariosFiltrados = listaBuscado.filter(
      (usuario) => usuario.sexo === valor
    );
    setLista(usuariosFiltrados);
  };
  const calculateProm = () => {
    let suma = 0;
    lista.forEach((element) => {
      suma = suma + parseInt(element.edad);
    });
    setPromedio((suma / lista.length).toFixed(3));
  };
  const calculateDesviacion = () => {
    const lista2 = [];
    lista.forEach((element) => {
      lista2.push((parseInt(element.edad) - promedio) ** 2);
    });
    let suma = 0;
    lista2.forEach((element) => {
      suma = suma + element;
    });
    setDesviacion(Math.sqrt(suma / lista2.length).toFixed(3));
  };
  return (
    <div>
      <div className="container-iconFilter-menu">
        <FontAwesomeIcon
          icon={faBars}
          className="menu-icono-header"
          onClick={() => setMenuContainerFilter(!menuContainerFilter)}
        />
        {menuContainerFilter && (
          <div className="container-filter-menu">
            <h5>Filtrar por: </h5>
            <div className="dropdown filter-button">
              <span
                className="btn btn-success"
                role="button"
                onClick={() => setLista(listaBuscado)}
              >
                Todo
              </span>
            </div>
            <div className="dropdown filter-button">
              <span
                className="btn btn-success dropdown-toggle"
                role="button"
                onClick={() => setMenu1(!menu1)}
              >
                Edad
              </span>
              {menu1 && (
                <div className="filter-button-menu1">
                  <span onClick={() => seleccionarMayorEdad(18)}>
                    Mayor de edad
                  </span>
                  <span onClick={() => seleccionarMenorEdad(18)}>
                    Menor de edad
                  </span>
                </div>
              )}
            </div>
            <div className="dropdown filter-button">
              <span
                className="btn btn-success dropdown-toggle"
                role="button"
                onClick={() => setMenu2(!menu2)}
              >
                Sexo
              </span>
              {menu2 && (
                <div className="filter-button-menu2">
                  <span onClick={() => seleccionarSexo("femenino")}>
                    Femenino
                  </span>
                  <span onClick={() => seleccionarSexo("masculino")}>
                    Masculino
                  </span>
                </div>
              )}
            </div>
            <h5>Promedio de edad: </h5>
            <div>
              <span
                className="btn btn-success button-calculate"
                role="button"
                onClick={calculateProm}
              >
                calcular
              </span>
              <span className="result-calculate">{promedio}</span>
            </div>
            <h5>desviacion estandar:</h5>
            <div>
              <span
                className="btn btn-success button-calculate"
                role="button"
                onClick={calculateDesviacion}
              >
                calcular
              </span>
              <span className="result-calculate">{desviacion}</span>
            </div>
          </div>
        )}
      </div>

      <div className="container-filter">
        <h5>Filtrar por: </h5>
        <div className="dropdown filter-button">
          <span
            className="btn btn-success"
            role="button"
            onClick={() => setLista(listaBuscado)}
          >
            Todo
          </span>
        </div>
        <div className="dropdown filter-button">
          <span
            className="btn btn-success dropdown-toggle"
            role="button"
            onClick={() => setMenu1(!menu1)}
          >
            Edad
          </span>
          {menu1 && (
            <div className="filter-button-menu1">
              <span onClick={() => seleccionarMayorEdad(18)}>
                Mayor de edad
              </span>
              <span onClick={() => seleccionarMenorEdad(18)}>
                Menor de edad
              </span>
            </div>
          )}
        </div>
        <div className="dropdown filter-button">
          <span
            className="btn btn-success dropdown-toggle"
            role="button"
            onClick={() => setMenu2(!menu2)}
          >
            Sexo
          </span>
          {menu2 && (
            <div className="filter-button-menu2">
              <span onClick={() => seleccionarSexo("femenino")}>Femenino</span>
              <span onClick={() => seleccionarSexo("masculino")}>
                Masculino
              </span>
            </div>
          )}
        </div>
        <h5>Promedio de edad: </h5>
        <div>
          <span
            className="btn btn-success button-calculate"
            role="button"
            onClick={calculateProm}
          >
            calcular
          </span>
          <span className="result-calculate">{promedio}</span>
        </div>
        <h5>desviacion estandar:</h5>
        <div>
          <span
            className="btn btn-success button-calculate"
            role="button"
            onClick={calculateDesviacion}
          >
            calcular
          </span>
          <span className="result-calculate">{desviacion}</span>
        </div>
      </div>
    </div>
  );
};

export { Filter };
