import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./Firebase";
import { idText } from "typescript";

export const crearUsuario = async(usuarios:{name:string; email:string}) => {
    try{
        const docRef = await addDoc(collection(db,"usuarios"),usuarios);
        console.log("usuario Creado con el id:",docRef.id);
        return docRef.id;
    } catch(error){
        console.error("error Creando Usuario",error)
        throw error;
    }
};

export const RegistrarLicenciaa = async(usuarios:{name:string; email:string}) => {
    try{
        const docRef = await addDoc(collection(db,"Licencias"),usuarios);
        console.log("Licencia Registrada con el id:",docRef.id);
        return docRef.id;
    } catch(error){
        console.error("error registrando licencia",error)
        throw error;
    }
};



export const obtenerUsuarios = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        const usuarios: { id: string; name: string; email: string }[] = [];
        querySnapshot.forEach((doc) => {
            usuarios.push({ id: doc.id, ...(doc.data() as { name: string; email: string }) });
        });
        return usuarios;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        throw error;
    }
};

export const actualizarUsuario = async (id:string,data:{name:string; email:string} )=>{
    try{
        const userRef=doc(db,"usuarios",id);
        await updateDoc(userRef,data);
        console.log("Usuario Actualizado",id);
    }catch(error){
        console.error("Error Actualizando Usuario:",error);
        throw error;
    }};
