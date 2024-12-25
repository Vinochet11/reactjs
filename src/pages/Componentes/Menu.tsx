import React from "react";

const Menu: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return (
    <nav>
      <ul>
        <li><button onClick={() => onNavigate("/registrar-usuario")}>Registrar Usuario</button></li>
        <li><button onClick={() => onNavigate("/registrar-licencia")}>Registrar Licencia</button></li>
        <li><button onClick={() => onNavigate("/visualizar-registros")}>Visualizar Registros</button></li>
        <li><button onClick={() => onNavigate("/")}>Salir</button></li>
      </ul>
    </nav>
  );
};

export default Menu;

