import React from "react";

const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Registro Civil
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/registrar-usuario">
                Registrar Nuevo Usuario
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/registrar-licencia">
                Registro de Nueva Licencia
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/visualizar-registros">
                Visualizar lo Registrado
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/salir">
                Salir
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
