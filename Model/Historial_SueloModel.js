import { collection, getDocs, getDoc, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const obtenerHistorialSuelo = async () => {
  try {
    const historialSnapshot = await getDocs(collection(db, "historial_suelo"));
    const historialList = await Promise.all(
      historialSnapshot.docs.map(async (docSnap) => {
        const historial = { id: docSnap.id, ...docSnap.data() };

        // Obtener el nombre del cultivo desde la referencia
        if (historial.Cultivo) {
          const cultivoDoc = await getDoc(historial.Cultivo);
          historial.cultivoNombre = cultivoDoc.exists() ? cultivoDoc.data().nombre : "No disponible";
        } else {
          historial.cultivoNombre = "No disponible";
        }

        return historial;
      })
    );
    return historialList;
  } catch (error) {
    console.error("Error al obtener el historial de suelo: ", error);
    throw new Error("No se pudo obtener el historial de suelo.");
  }
};

export const obtenerHistorialSueloPorId = async (historialId) => {
  try {
    const historialDoc = await getDoc(doc(db, "historial_suelo", historialId));
    if (!historialDoc.exists()) {
      throw new Error("Registro de historial de suelo no encontrado");
    }

    const historialData = historialDoc.data();

    let cultivoNombre = "No disponible";
    if (historialData.Cultivo) {
      const cultivoDoc = await getDoc(historialData.Cultivo);
      if (cultivoDoc.exists()) {
        cultivoNombre = cultivoDoc.data().nombre;
      }
    }

    return { ...historialData, cultivoNombre };
  } catch (error) {
    console.error("Error al obtener detalles del historial de suelo:", error);
    throw error;
  }
};

export const eliminarHistorialSuelo = async (historialId) => {
  try {
    await deleteDoc(doc(db, "historial_suelo", historialId));
    return true;
  } catch (error) {
    console.error("Error al eliminar el historial de suelo:", error);
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

export const addHistorialSuelo = async (selectedCultivo, fechaMedicion, nutrientes, observaciones, pH) => {
  if (!selectedCultivo || !fechaMedicion || !nutrientes || !observaciones || pH === undefined) {
    throw new Error("Todos los campos son obligatorios.");
  }

  try {
    await addDoc(collection(db, "historial_suelo"), {
      Cultivo: doc(db, "cultivos", selectedCultivo.id),
      // Se añade "T00:00:00" para que la fecha se interprete sin ajustes de zona horaria
      fechaMedicion: new Date(fechaMedicion + "T00:00:00"),
      nutrientes,
      observaciones,
      pH: parseFloat(pH),
    });
  } catch (error) {
    console.error("Error al registrar historial de suelo: ", error);
    throw new Error("No se pudo registrar el historial de suelo.");
  }
};

export const actualizarHistorialSuelo = async (historialId, historialData) => {
  try {
    await updateDoc(doc(db, "historial_suelo", historialId), historialData);
    return true;
  } catch (error) {
    console.error("Error al actualizar el historial de suelo: ", error);
    throw error;
  }
};