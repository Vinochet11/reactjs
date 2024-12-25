import React, { useState } from "react";
import Menu from "./pages/Componentes/Menu";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import RegistrarLicencia from "./pages/RegistrarLicencia";
import VisualizarRegistros from "./pages/MostrarRegistro";
import ActualizarUsuario from "./pages/ActualizarUsuario";
import Login from "./pages/Componentes/Login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [currentRoute, setCurrentRoute] = useState<string>("/");

  // Función para manejar el inicio de sesión
  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setCurrentRoute("/menu"); // Redirige al menú principal
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  // Renderizado de las páginas según la ruta actual
  const renderPage = () => {
    switch (currentRoute) {
      case "/menu":
        return <Menu onNavigate={setCurrentRoute} />;
      case "/registrar-usuario":
        return <RegistrarUsuario onNavigate={setCurrentRoute} />;
      case "/registrar-licencia":
        return <RegistrarLicencia onNavigate={setCurrentRoute}/>;
      case "/visualizar-registros":
        return <VisualizarRegistros onNavigate={setCurrentRoute}/>;
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
