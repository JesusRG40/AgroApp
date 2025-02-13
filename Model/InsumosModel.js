import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const obtenerInsumos = async () => {
  try {
    const insumosSnapshot = await getDocs(collection(db, "insumos"));
    return insumosSnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("Error al obtener los insumos: ", error);
    throw new Error("No se pudo obtener la lista de insumos.");
  }
};