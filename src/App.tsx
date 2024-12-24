import React, { useContext } from "react";
import Login from "./pages/Componentes/Login";
import { AuthContext } from "./pages/Componentes/AuthContext";

const App: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

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

export default App;