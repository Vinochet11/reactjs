import React, { useState } from "react";
import Menu from "./pages/Componentes/Menu";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import RegistrarLicencia from "./pages/RegistrarLicencia";
import ActualizarUsuario from "./pages/ActualizarUsuario";
import MostrarRegistro from "./pages/MostrarRegistro";
import Login from "./pages/Componentes/Login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string>("/");

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setCurrentRoute("/menu");
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  const renderPage = () => {
    switch (currentRoute) {
      case "/menu":
        return <Menu onNavigate={setCurrentRoute} />;
      case "/registrar-usuario":
        return <RegistrarUsuario onNavigate={setCurrentRoute} />;
      case "/registrar-licencia":
        return <RegistrarLicencia onNavigate={setCurrentRoute} />;
      case "/visualizar-registros":
        return <MostrarRegistro onNavigate={setCurrentRoute}/>;
        
      case "/actualizar-usuario":
        return <ActualizarUsuario onNavigate={setCurrentRoute} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div>
      <h1>Sistema de Registro Civil</h1>
      {renderPage()}
    </div>
  );
};

export default App;

