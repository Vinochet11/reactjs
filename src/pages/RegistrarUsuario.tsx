import React, { useState } from "react";
import { crearUsuario } from "../Firebase/Promesas";

const RegistrarUsuario: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [profesion, setProfesion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const usuario = {
        nombre,
        apellido,
        rut,
        direccion,
        telefono,
        fechaNacimiento,
        genero,
        profesion,
      };
      const userId = await crearUsuario(usuario);
      alert(`Usuario creado con éxito. ID: ${userId}`);
      setNombre("");
      setApellido("");
      setRut("");
      setDireccion("");
      setTelefono("");
      setFechaNacimiento("");
      setGenero("");
      setProfesion("");
      onNavigate("/menu");
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
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rut" className="form-label">RUT</label>
          <input
            type="text"
            className="form-control"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Género</label>
          <select
            className="form-control"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Seleccione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="profesion" className="form-label">Profesión</label>
          <input
            type="text"
            className="form-control"
            id="profesion"
            value={profesion}
            onChange={(e) => setProfesion(e.target.value)}
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
