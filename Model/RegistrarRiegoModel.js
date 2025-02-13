import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default class RiegoModel {
  static async obtenerCultivos() {
    try {
      const cultivosSnapshot = await getDocs(collection(db, "cultivos"));
      return cultivosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error al obtener cultivos: ", error);
      throw error;
    }
  }

  static async agregarRiego({ selectedCultivo, fechaRiego, cantAgua, duracionRiego, metodoRiego }) {
    try {
      await addDoc(collection(db, "riegos"), {
        Cultivo: doc(db, "cultivos", selectedCultivo.id),
        fechaRiego: new Date(fechaRiego),
        cantAgua: parseFloat(cantAgua),
        duracionRiego: parseInt(duracionRiego, 10),
        metodoRiego,
      });
      return true;
    } catch (error) {
      console.error("Error al registrar riego: ", error);
      throw error;
    }
  }
}