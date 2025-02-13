import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default class RiegoModel {
  static async obtenerRiegos() {
    try {
      const riegosSnapshot = await getDocs(collection(db, "riegos"));
      const riegosList = await Promise.all(
        riegosSnapshot.docs.map(async (docSnap) => {
          const riego = { id: docSnap.id, ...docSnap.data() };

          // Obtener el nombre del cultivo desde la referencia
          if (riego.Cultivo) {
            const cultivoDoc = await getDoc(riego.Cultivo);
            riego.cultivoNombre = cultivoDoc.exists() ? cultivoDoc.data().nombre : "No disponible";
          } else {
            riego.cultivoNombre = "No disponible";
          }

          return riego;
        })
      );
      return riegosList;
    } catch (error) {
      console.error("Error al obtener los riegos: ", error);
      return [];
    }
  }
}