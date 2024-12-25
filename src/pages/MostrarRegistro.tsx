import React, { useEffect, useState } from "react";
import { obtenerUsuarios } from "../Firebase/Promesas";

const MostrarRegistro: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
    const [usuarios, setUsuarios] = useState<{ id: string; name: string; email: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await obtenerUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Error al cargar los registros:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Lista de Usuarios</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.name || "N/A"}</td>
                                <td>{usuario.email || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button className="btn btn-secondary mt-3" onClick={() => onNavigate("/menu")}>
                Volver al Menú
            </button>
        </div>
    );
};

export default MostrarRegistro;
