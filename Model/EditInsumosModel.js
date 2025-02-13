import { doc, getDoc, updateDoc } from "firebase/firestore";
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

export const actualizarInsumo = async (insumoId, datosActualizados) => {
  try {
    await updateDoc(doc(db, "insumos", insumoId), datosActualizados);
  } catch (error) {
    console.error("Error al actualizar el insumo:", error);
    throw error;
  }
};
