import React, { useEffect, useState } from "react";
import { obtenerUsuarios, eliminarUsuario } from "../Firebase/Promesas";

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
    }[]
  >([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosObtenidos = await obtenerUsuarios();
        setUsuarios(usuariosObtenidos);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEliminar = async (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmar) {
      try {
        await eliminarUsuario(id);
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        alert("Usuario eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Hubo un error al eliminar el usuario. Intenta de nuevo.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Visualizar Registros</h2>
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
                  className="btn btn-danger btn-sm"
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
