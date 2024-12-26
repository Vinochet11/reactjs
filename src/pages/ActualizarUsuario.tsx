import React, { useState, useEffect } from "react";
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
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<
    | {
        id: string;
        nombre: string;
        apellido: string;
        rut: string;
        direccion: string;
        telefono: string;
        fechaNacimiento: string;
        genero: string;
        profesion: string;
      }
    | null
  >(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarUsuario = async () => {
    if (usuarioSeleccionado) {
      try {
        await actualizarUsuario(usuarioSeleccionado.id, formData);
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
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Actualizar Usuario</h2>
      <div className="mb-3">
        <label htmlFor="usuarioSeleccionado" className="form-label">
          Selecciona un usuario
        </label>
        <select
          id="usuarioSeleccionado"
          className="form-select"
          value={usuarioSeleccionado?.id || ""}
          onChange={(e) => {
            const selectedUser = usuarios.find((user) => user.id === e.target.value) || null;
            setUsuarioSeleccionado(selectedUser);
            if (selectedUser) {
              setFormData({
                nombre: selectedUser.nombre,
                apellido: selectedUser.apellido,
                rut: selectedUser.rut,
                direccion: selectedUser.direccion,
                telefono: selectedUser.telefono,
                fechaNacimiento: selectedUser.fechaNacimiento,
                genero: selectedUser.genero,
                profesion: selectedUser.profesion,
              });
            }
          }}
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nombre} {user.apellido}
            </option>
          ))}
        </select>
      </div>

      {usuarioSeleccionado && (
        <form>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              className="form-control"
              value={formData.apellido}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rut" className="form-label">
              RUT
            </label>
            <input
              type="text"
              id="rut"
              name="rut"
              className="form-control"
              value={formData.rut}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              className="form-control"
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              className="form-control"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genero" className="form-label">
              Género
            </label>
            <select
              id="genero"
              name="genero"
              className="form-select"
              value={formData.genero}
              onChange={handleInputChange}
            >
              <option value="">Selecciona un género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="profesion" className="form-label">
              Profesión
            </label>
            <input
              type="text"
              id="profesion"
              name="profesion"
              className="form-control"
              value={formData.profesion}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleActualizarUsuario}>
            Actualizar Usuario
          </button>
        </form>
      )}

      <button type="button" className="btn btn-secondary mt-3" onClick={() => onNavigate("/menu")}>
        Volver al Menú
      </button>
    </div>
  );
};

export default ActualizarUsuario;
