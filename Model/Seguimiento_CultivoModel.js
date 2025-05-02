import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Modelo de datos para la colección 'seguimiento_cultivo'
export const obtenerSeguimientos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'seguimiento_cultivo'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error obteniendo seguimientos:', error);
    throw new Error('No se pudo obtener la lista de seguimientos de cultivo.');
  }
};

export const eliminarSeguimiento = async (id) => {
  try {
    await deleteDoc(doc(db, 'seguimiento_cultivo', id));
  } catch (error) {
    console.error('Error al eliminar seguimiento:', error);
    throw new Error('No se pudo eliminar el seguimiento de cultivo.');
  }
};

export const actualizarSeguimiento = async (id, datos) => {
  try {
    // Convertir fechaRevision de string a Date para evitar desfases de zona horaria
    let fecha = datos.fechaRevision;
    if (typeof fecha === 'string') {
      fecha = new Date(fecha + 'T00:00:00');
    }
    const docRef = doc(db, 'seguimiento_cultivo', id);
    await updateDoc(docRef, {
      ...datos,
      fechaRevision: fecha,
    });
  } catch (error) {
    console.error('Error al actualizar seguimiento:', error);
    throw new Error('No se pudo actualizar el seguimiento de cultivo.');
  }
};

export const registrarSeguimiento = async (seguimiento) => {
  try {
    // Convierte el string YYYY-MM-DD a Date sin desfases de zona horaria
    const fecha = new Date(seguimiento.fechaRevision + 'T00:00:00');
    await addDoc(collection(db, 'seguimiento_cultivo'), {
      fechaRevision: fecha,
      estadoCultivo: seguimiento.estadoCultivo,
      observaciones: seguimiento.observaciones,
      recomendaciones: seguimiento.recomendaciones,
      idCultivo: seguimiento.idCultivo,
    });
  } catch (error) {
    console.error('Error al registrar seguimiento:', error);
    throw new Error('No se pudo registrar el seguimiento de cultivo.');
  }
};