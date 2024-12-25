import React, { useState } from "react";
import { crearUsuario } from "../Firebase/Promesas";


const RegistrarUsuario: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = await crearUsuario({ name, email }); // Asegúrate de que `crearUsuario` se importe correctamente.
      alert(`Usuario creado con éxito. ID: ${userId}`);
      setName("");
      setEmail("");
      onNavigate("/menu"); // Redirige al menú después de un registro exitoso.
    } catch (error) {
      alert("Error al registrar usuario. Intenta nuevamente.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Registrar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : "Registrar"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => onNavigate("/menu")}
        >
          Volver al Menú
        </button>
      </form>
    </div>
  );
};

export default RegistrarUsuario;
