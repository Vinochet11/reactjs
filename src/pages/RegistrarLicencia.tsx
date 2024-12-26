import React, { useState, useEffect } from "react";
import { obtenerUsuarios, RegistrarLicenciaa } from "../Firebase/Promesas";

const RegistrarLicencia: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [usuarios, setUsuarios] = useState<{ id: string; nombre: string; apellido: string }[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [tipoLicencia, setTipoLicencia] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        alert("No se pudieron cargar los usuarios registrados.");
      }
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!usuarioSeleccionado) {
      alert("Por favor, selecciona un usuario.");
      return;
    }
  
    // Obtener datos del usuario seleccionado
    const usuario = usuarios.find((user) => user.id === usuarioSeleccionado);
  
    if (!usuario) {
      alert("Usuario no encontrado.");
      return;
    }
  
    const licencia = {
      usuarioId: usuarioSeleccionado, // ID del usuario
      nombre: usuario.nombre, // Nombre del usuario
      apellido: usuario.apellido, // Apellido del usuario
      ciudad, // Ciudad seleccionada
      categoria: tipoLicencia, // Categoría de la licencia
      fechaExpedicion: fechaEmision, // Fecha de expedición
    };
  
    try {
      await RegistrarLicenciaa(licencia);
      alert("Licencia registrada con éxito.");
  
      // Limpiar formulario
      setUsuarioSeleccionado("");
      setCiudad("");
      setTipoLicencia("");
      setFechaEmision("");
      setFechaVencimiento("");
    } catch (error) {
      console.error("Error registrando licencia:", error);
      alert("Error al registrar la licencia. Por favor, inténtalo de nuevo.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Registrar Licencia</h2>
      <form onSubmit={handleSubmit}>
        {/* Select para usuarios */}
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Seleccionar Usuario</label>
          <select
            className="form-control"
            id="usuario"
            value={usuarioSeleccionado}
            onChange={(e) => setUsuarioSeleccionado(e.target.value)}
            required
          >
            <option value="">-- Seleccionar Usuario --</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre} {usuario.apellido}
              </option>
            ))}
          </select>
        </div>

        {/* Ciudad */}
        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">Ciudad</label>
          <input
            type="text"
            className="form-control"
            id="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            required
          />
        </div>

        {/* Tipo de Licencia */}
        <div className="mb-3">
          <label htmlFor="tipoLicencia" className="form-label">Tipo de Licencia</label>
          <select
            className="form-control"
            id="tipoLicencia"
            value={tipoLicencia}
            onChange={(e) => setTipoLicencia(e.target.value)}
            required
          >
            <option value="">-- Seleccionar Tipo --</option>
            <option value="Clase A">Clase A</option>
            <option value="Clase B">Clase B</option>
            <option value="Clase C">Clase C</option>
            <option value="Clase D">Clase D</option>
          </select>
        </div>

        {/* Fecha de Emisión */}
        <div className="mb-3">
          <label htmlFor="fechaEmision" className="form-label">Fecha de Emisión</label>
          <input
            type="date"
            className="form-control"
            id="fechaEmision"
            value={fechaEmision}
            onChange={(e) => setFechaEmision(e.target.value)}
            required
          />
        </div>

        {/* Fecha de Vencimiento */}
        <div className="mb-3">
          <label htmlFor="fechaVencimiento" className="form-label">Fecha de Vencimiento</label>
          <input
            type="date"
            className="form-control"
            id="fechaVencimiento"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : "Registrar Licencia"}
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

export default RegistrarLicencia;
