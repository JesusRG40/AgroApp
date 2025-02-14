import { collection, getDocs, getDoc, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const obtenerRiegos = async () => {
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
    throw new Error("No se pudieron obtener los riegos.");
  }
};

export const obtenerRiegoPorId = async (riegoId) => {
  try {
    const riegoDoc = await getDoc(doc(db, "riegos", riegoId));
    if (!riegoDoc.exists()) {
      throw new Error("Riego no encontrado");
    }

    const riegoData = riegoDoc.data();

    let cultivoNombre = "No disponible";
    if (riegoData.Cultivo) {
      const cultivoDoc = await getDoc(riegoData.Cultivo);
      if (cultivoDoc.exists()) {
        cultivoNombre = cultivoDoc.data().nombre;
      }
    }

    return { ...riegoData, cultivoNombre };
  } catch (error) {
    console.error("Error al obtener detalles del riego:", error);
    throw error;
  }
};

export const eliminarRiego = async (riegoId) => {
  try {
    await deleteDoc(doc(db, "riegos", riegoId));
    return true;
  } catch (error) {
    console.error("Error al eliminar el riego:", error);
    throw error;
  }
};

export const getCultivos = async () => {
  try {
    const cultivosSnapshot = await getDocs(collection(db, "cultivos"));
    return cultivosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener cultivos: ", error);
    return [];
  }
};

export const addRiego = async (selectedCultivo, fechaRiego, cantAgua, duracionRiego, metodoRiego) => {
  if (!selectedCultivo || !fechaRiego || !cantAgua || !duracionRiego || !metodoRiego) {
    throw new Error("Todos los campos son obligatorios.");
  }

  try {
    await addDoc(collection(db, "riegos"), {
      Cultivo: doc(db, "cultivos", selectedCultivo.id),
      fechaRiego: new Date(fechaRiego),
      cantAgua: parseFloat(cantAgua),
      duracionRiego: parseInt(duracionRiego, 10),
      metodoRiego,
    });
  } catch (error) {
    console.error("Error al registrar riego: ", error);
    throw new Error("No se pudo registrar el riego.");
  }
};

export const obtenerRiego = async (riegoId) => {
  try {
    const riegoDoc = await getDoc(doc(db, "riegos", riegoId));
    if (riegoDoc.exists()) {
      return riegoDoc.data();
    } else {
      throw new Error("Riego no encontrado.");
    }
  } catch (error) {
    console.error("Error al obtener detalles del riego: ", error);
    throw error;
  }
};

export const actualizarRiego = async (riegoId, riegoData) => {
  try {
    await updateDoc(doc(db, "riegos", riegoId), riegoData);
    return true;
  } catch (error) {
    console.error("Error al actualizar el riego: ", error);
    throw error;
  }
};