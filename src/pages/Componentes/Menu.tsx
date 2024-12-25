import React from "react";

const Menu: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return (
    <nav>
      <button onClick={() => onNavigate("/registrar-usuario")}>Registrar Usuario</button>
      <button onClick={() => onNavigate("/registrar-licencia")}>Registrar Licencia</button>
      <button onClick={() => onNavigate("/visualizar-registros")}>Visualizar Registros</button>
      <button onClick={() => onNavigate("/actualizar-usuario")}>Actualizar Usuario</button>
      <button onClick={() => onNavigate("/")}>Salir</button>
    </nav>
  );
};

export default Menu;

