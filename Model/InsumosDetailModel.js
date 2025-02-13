import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const obtenerInsumoPorId = async (insumoId) => {
  try {
    const insumoDoc = await getDoc(doc(db, "insumos", insumoId));
    if (insumoDoc.exists()) {
      return insumoDoc.data();
    } else {
      throw new Error("Insumo no encontrado.");
    }
  } catch (error) {
    console.error("Error al obtener detalles del insumo:", error);
    throw error;
  }
};

export const eliminarInsumo = async (insumoId) => {
  try {
    await deleteDoc(doc(db, "insumos", insumoId));
  } catch (error) {
    console.error("Error al eliminar el insumo:", error);
    throw error;
  }
};
