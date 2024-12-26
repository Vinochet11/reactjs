import React, { useEffect, useState } from "react";
import { obtenerUsuarios, actualizarUsuario } from "../Firebase/Promesas";

const ActualizarUsuario: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [usuarios, setUsuarios] = useState<
    {
      id: string;
      nombre: string;
      apellido: string;
      rut: string;
      direccion: string;
      telefono: string;
      fechaNacimiento: string;
      genero: string;
      profesion: string;
    }[]
  >([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    direccion: "",
    telefono: "",
    fechaNacimiento: "",
    genero: "",
    profesion: "",
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleEditar = (id: string) => {
    const usuario = usuarios.find((u) => u.id === id);
    if (usuario) {
      setUsuarioSeleccionado(id);
      setFormData({ ...usuario });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usuarioSeleccionado) {
      try {
        await actualizarUsuario(usuarioSeleccionado, formData);
        alert("Usuario actualizado con éxito.");
        setUsuarioSeleccionado(null);
        setFormData({
          nombre: "",
          apellido: "",
          rut: "",
          direccion: "",
          telefono: "",
          fechaNacimiento: "",
          genero: "",
          profesion: "",
        });
        const updatedUsuarios = await obtenerUsuarios();
        setUsuarios(updatedUsuarios);
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("Hubo un error al actualizar el usuario.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Actualizar Usuarios</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>RUT</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Fecha de Nacimiento</th>
            <th>Género</th>
            <th>Profesión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.rut}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.fechaNacimiento}</td>
              <td>{usuario.genero}</td>
              <td>{usuario.profesion}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditar(usuario.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarioSeleccionado && (
        <form onSubmit={handleSubmit} className="mt-4">
          <h3>Editar Usuario</h3>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">RUT</label>
            <input
              type="text"
              className="form-control"
              value={formData.rut}
              onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              value={formData.fechaNacimiento}
              onChange={(e) =>
                setFormData({ ...formData, fechaNacimiento: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Género</label>
            <input
              type="text"
              className="form-control"
              value={formData.genero}
              onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profesión</label>
            <input
              type="text"
              className="form-control"
              value={formData.profesion}
              onChange={(e) => setFormData({ ...formData, profesion: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-3"
            onClick={() => setUsuarioSeleccionado(null)}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default ActualizarUsuario;
