import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import RiegoModel from "../Model/EditRiegoModel";

export default class RiegoController {
  static async fetchRiegoDetail(riegoId) {
    try {
      const riegoDoc = await getDoc(doc(db, "riegos", riegoId));
      if (riegoDoc.exists()) {
        return RiegoModel.fromFirestore(riegoDoc);
      } else {
        throw new Error("Riego no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener detalles del riego:", error);
      throw error;
    }
  }

  static async updateRiego(riego) {
    try {
      await updateDoc(doc(db, "riegos", riego.id), {
        cantAgua: riego.cantAgua,
        duracionRiego: riego.duracionRiego,
        metodoRiego: riego.metodoRiego,
      });
    } catch (error) {
      console.error("Error al actualizar el riego:", error);
      throw error;
    }
  }
}