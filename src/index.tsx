import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // No uses `export const App`. Usa `default export`.
import AuthProvider from "./pages/Componentes/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
