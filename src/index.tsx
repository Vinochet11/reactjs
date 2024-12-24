import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import AuthProvider from "./pages/Componentes/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);