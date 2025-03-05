import { collection, getDocs, getDoc, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Función para obtener todos los registros de costos
export const obtenerCostos = async () => {
  try {
    const costosSnapshot = await getDocs(collection(db, "costos"));
    const costosList = await Promise.all(
      costosSnapshot.docs.map(async (docSnap) => {
        const costo = { id: docSnap.id, ...docSnap.data() };

        // Obtener el nombre del cultivo desde la referencia
        if (costo.Cultivo) {
          const cultivoDoc = await getDoc(costo.Cultivo);
          costo.cultivoNombre = cultivoDoc.exists() ? cultivoDoc.data().nombre : "No disponible";
        } else {
          costo.cultivoNombre = "No disponible";
        }

        return costo;
      })
    );
    return costosList;
  } catch (error) {
    console.error("Error al obtener los costos: ", error);
    throw new Error("No se pudo obtener los costos.");
  }
};

// Función para obtener un costo por su ID
export const obtenerCostoPorId = async (costoId) => {
  try {
    const costoDoc = await getDoc(doc(db, "costos", costoId));
    if (!costoDoc.exists()) {
      throw new Error("Registro de costo no encontrado");
    }

    const costoData = costoDoc.data();

    let cultivoNombre = "No disponible";
    if (costoData.Cultivo) {
      const cultivoDoc = await getDoc(costoData.Cultivo);
      if (cultivoDoc.exists()) {
        cultivoNombre = cultivoDoc.data().nombre;
      }
    }

    return { ...costoData, cultivoNombre };
  } catch (error) {
    console.error("Error al obtener detalles del costo:", error);
    throw error;
  }
};

// Función para eliminar un registro de costo
export const eliminarCosto = async (costoId) => {
  try {
    await deleteDoc(doc(db, "costos", costoId));
    return true;
  } catch (error) {
    console.error("Error al eliminar el costo:", error);
    throw error;
  }
};

// Función para agregar un nuevo registro de costo
export const agregarCosto = async (selectedCultivo, tipoCosto, descripcionCosto, monto, fechaCosto) => {
  if (!selectedCultivo || !tipoCosto || !descripcionCosto || monto === undefined || !fechaCosto) {
    throw new Error("Todos los campos son obligatorios.");
  }

  try {
    await addDoc(collection(db, "costos"), {
      Cultivo: doc(db, "cultivos", selectedCultivo.id),
      tipoCosto,
      descripcionCosto,
      monto: parseFloat(monto),
      // Se añade "T00:00:00" para que la fecha se interprete sin ajustes de zona horaria
      fechaCosto: new Date(fechaCosto + "T00:00:00")
    });
  } catch (error) {
    console.error("Error al registrar el costo: ", error);
    throw new Error("No se pudo registrar el costo.");
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

// Función para actualizar un registro de costo
export const actualizarCosto = async (costoId, costoData) => {
  try {
    await updateDoc(doc(db, "costos", costoId), costoData);
    return true;
  } catch (error) {
    console.error("Error al actualizar el costo: ", error);
    throw error;
  }
};