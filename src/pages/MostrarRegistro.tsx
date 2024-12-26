import React, { useState, useEffect } from "react";
import { obtenerUsuarios, obtenerLicencias, eliminarUsuario } from "../Firebase/Promesas";

const MostrarRegistro: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
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
      tipoLicencia?: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await obtenerUsuarios();
        const licenciasData = await obtenerLicencias();

        const usuariosConLicencia = usuariosData.map((usuario) => {
          const licencia = licenciasData.find(
            (lic) => lic.usuarioId === usuario.id
          );
          return {
            ...usuario,
            tipoLicencia: licencia ? licencia.categoria : "Sin licencia", // Cambia tipoLicencia por categoria
          };
        });

        setUsuarios(usuariosConLicencia);
      } catch (error) {
        console.error("Error al obtener registros:", error);
      }
    };

    fetchData();
  }, []);

  const handleEliminar = async (usuarioId: string) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario y su licencia?");
    if (confirmar) {
      try {
        await eliminarUsuario(usuarioId);
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== usuarioId)
        );
        alert("Usuario y licencia eliminados con éxito.");
      } catch (error) {
        console.error("Error al eliminar usuario y licencia:", error);
        alert("Ocurrió un error al intentar eliminar el usuario y su licencia.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registros de Usuarios</h2>
      <table className="table">
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
            <th>Tipo de Licencia</th>
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
              <td>{usuario.tipoLicencia || "Sin licencia"}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEliminar(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => onNavigate("/menu")}
      >
        Volver al Menú
      </button>
    </div>
  );
};

export default MostrarRegistro;
