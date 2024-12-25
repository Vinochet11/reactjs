import React, { useState } from "react";
import Menu from "./pages/Componentes/Menu";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import RegistrarLicencia from "./pages/RegistrarLicencia";
import VisualizarRegistros from "./pages/MostrarRegistro";
import Login from "./pages/Componentes/Login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controla si el usuario está autenticado
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname);

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setCurrentRoute("/"); // Redirige al menú principal
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentRoute) {
      case "/registrar-usuario":
        return <RegistrarUsuario />;
      case "/registrar-licencia":
        return <RegistrarLicencia />;
      case "/visualizar-registros":
        return <VisualizarRegistros />;
      case "/salir":
        setIsAuthenticated(false); // Cierra sesión
        return <h1>Saliendo...</h1>;
      default:
        return <h1>Bienvenido al sistema de Registro Civil</h1>;
    }
  };

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div>
      {isAuthenticated && <Menu />}
      {renderPage()}
    </div>
  );
};

export default App;
