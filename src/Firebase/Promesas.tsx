import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./Firebase";
import { idText } from "typescript";

export const crearUsuario = async(usuarios:{
    nombre:string; 
    apellido:string;
    rut:string;
    direccion:string;
    telefono:string;
    fechaNacimiento:string;
    genero:string;
    profesion:string;
    }) => {
    try{
        const docRef = await addDoc(collection(db,"usuarios"),usuarios);
        console.log("usuario Creado con el id:",docRef.id);
        return docRef.id;
    } catch(error){
        console.error("error Creando Usuario",error)
        throw error;
    }
};

export const RegistrarLicenciaa = async(licencia: {
    usuarioId: string; 
    nombre: string; 
    apellido: string; 
    ciudad: string; 
    categoria: string;
    fechaExpedicion: string; 
  }) => {
    try {
      const docRef = await addDoc(collection(db, "Licencias"), licencia);
      console.log("Licencia Registrada con el id:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error registrando licencia:", error);
      throw error;
    }
  };
  


export const obtenerUsuarios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const usuarios: {
        id: string;
        nombre: string;
        apellido: string;
        rut: string;
        direccion: string;
        telefono: string;
        fechaNacimiento: string;
        genero: string;
        profesion: string;
      }[] = [];
      querySnapshot.forEach((doc) => {
        usuarios.push({ id: doc.id, ...(doc.data() as any) });
      });
      return usuarios;
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      throw error;
    }
  };
  
  export const obtenerLicencias = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Licencias"));
      const licencias: {
        usuarioId: string;
        categoria: string; // Ajuste aquí para reflejar el campo correcto
      }[] = [];
      querySnapshot.forEach((doc) => {
        licencias.push({
          usuarioId: doc.data().usuarioId,
          categoria: doc.data().categoria, // Asegúrate de usar el nombre correcto del campo en la base de datos
        });
      });
      return licencias;
    } catch (error) {
      console.error("Error obteniendo licencias:", error);
      throw error;
    }
  };
  

  export const actualizarUsuario = async (
    id: string,
    usuario: {
      nombre: string;
      apellido: string;
      rut: string;
      direccion: string;
      telefono: string;
      fechaNacimiento: string;
      genero: string;
      profesion: string;
    }
  ) => {
    try {
      const userDoc = doc(db, "usuarios", id);
      await updateDoc(userDoc, usuario);
      console.log(`Usuario con ID ${id} actualizado exitosamente.`);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  };


  export const eliminarUsuario = async (id: string) => {
    try {
      // Eliminar usuario
      const userDoc = doc(db, "usuarios", id);
      await deleteDoc(userDoc);
  
      // Eliminar licencia asociada
      const licenciasQuery = query(
        collection(db, "Licencias"),
        where("usuarioId", "==", id)
      );
      const licenciasSnapshot = await getDocs(licenciasQuery);
      licenciasSnapshot.forEach(async (licenciaDoc) => {
        await deleteDoc(doc(db, "Licencias", licenciaDoc.id));
      });
  
      console.log(`Usuario y licencia con ID: ${id} eliminados.`);
    } catch (error) {
      console.error("Error eliminando usuario y licencia:", error);
      throw error;
    }
  };
  