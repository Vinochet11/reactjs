import React, { useContext } from "react";
import Login from "./pages/Componentes/Login";
import { AuthContext } from "./pages/Componentes/AuthContext";

export const App: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log("Estado de autenticación en App:", isAuthenticated); // Depuración

  return (
    <div>
      {isAuthenticated ? (
        <h1>Bienvenido al sistema de Registro Civil</h1>
      ) : (
        <Login />
      )}
    </div>
  );
};

