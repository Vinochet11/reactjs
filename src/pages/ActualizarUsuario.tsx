import React, { useState, useEffect } from "react";
import { obtenerUsuarios, actualizarUsuario } from "../Firebase/Promesas";

const ActualizarUsuario: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [usuarios, setUsuarios] = useState<{ id: string; name: string; email: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await actualizarUsuario(selectedUser, { name, email });
      alert("Usuario actualizado con éxito");
      onNavigate("/menu"); // Volver al menú
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      alert("Hubo un error al actualizar el usuario.");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    const user = usuarios.find((u) => u.id === userId);
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  };

  return (
    <div>
      <h2>Actualizar Usuario</h2>
      <select value={selectedUser} onChange={handleSelectChange}>
        <option value="">Selecciona un usuario</option>
        {usuarios.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} - {user.email}
          </option>
        ))}
      </select>
      {selectedUser && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => onNavigate("/menu")}>
            Volver al Menú
          </button>
        </form>
      )}
    </div>
  );
};

export default ActualizarUsuario;
