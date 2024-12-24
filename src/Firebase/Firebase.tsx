import { Credenciales } from "./Credenciales";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-Firestore.js";

const app = initializeApp(Credenciales);
export const db = getFirestore(app);