import React from "react";

const Menu: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#!">
            Sistema de Registro
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => onNavigate("/registrar-usuario")}
                >
                  Registrar Usuario
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => onNavigate("/registrar-licencia")}
                >
                  Registrar Licencia
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => onNavigate("/visualizar-registros")}
                >
                  Visualizar Registros
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => onNavigate("/actualizar-usuario")}
                >
                  Actualizar Usuario
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger nav-link"
                  onClick={() => onNavigate("/")}
                >
                  Salir
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5 text-center">
        <h2>¡Bienvenido al Sistema de Registro!</h2>
        <p>Selecciona una opción del menú para continuar.</p>
      </div>
    </div>
  );
};

export default Menu;

