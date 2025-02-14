import { collection, getDocs, getDoc, deleteDoc, updateDoc, doc, addDoc } from "firebase/firestore";
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

export const actualizarInsumo = async (insumoId, datosActualizados) => {
  try {
    await updateDoc(doc(db, "insumos", insumoId), datosActualizados);
  } catch (error) {
    console.error("Error al actualizar el insumo:", error);
    throw error;
  }
};

export const registrarInsumo = async (insumo) => {
  try {
    await addDoc(collection(db, "insumos"), insumo);
    return true;
  } catch (error) {
    console.error("Error al registrar insumo: ", error);
    throw error;
  }
};
