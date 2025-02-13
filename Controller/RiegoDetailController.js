import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Riego from "../Model/RiegoDetailModel";

export const fetchRiegoDetail = async (riegoId) => {
  try {
    const riegoDoc = await getDoc(doc(db, "riegos", riegoId));
    if (riegoDoc.exists()) {
      const riegoData = riegoDoc.data();
      const riego = new Riego(riegoData);

      // Resolver referencia del cultivo
      let cultivoNombre = "No disponible";
      if (riegoData.Cultivo) {
        const cultivoDoc = await getDoc(riegoData.Cultivo);
        cultivoNombre = cultivoDoc.exists() ? cultivoDoc.data().nombre : "No disponible";
      }

      return { riego, cultivoNombre };
    }
    return null;
  } catch (error) {
    console.error("Error al obtener detalles del riego: ", error);
    throw error;
  }
};

export const deleteRiego = async (riegoId) => {
  try {
    await deleteDoc(doc(db, "riegos", riegoId));
    return true;
  } catch (error) {
    console.error("Error al eliminar el riego: ", error);
    return false;
  }
};