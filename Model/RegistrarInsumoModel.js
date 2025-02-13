import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default class InsumoModel {
  static async agregarInsumo({ nombre, tipo, cantDisponible, unidadMedida }) {
    try {
      await addDoc(collection(db, "insumos"), {
        nombre,
        tipo,
        cantDisponible: parseFloat(cantDisponible),
        unidadMedida,
      });
      return true;
    } catch (error) {
      console.error("Error al registrar insumo: ", error);
      throw error;
    }
  }
}