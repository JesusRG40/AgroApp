import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const obtenerCultivos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cultivos'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error obteniendo cultivos:', error);
    throw new Error('No se pudo obtener la lista de cultivos.');
  }
};

export const eliminarCultivo = async (id) => {
  try {
    await deleteDoc(doc(db, 'cultivos', id));
  } catch (error) {
    console.error('Error al eliminar cultivo:', error);
    throw new Error('No se pudo eliminar el cultivo.');
  }
};

export const actualizarCultivo = async (id, datos) => {
  try {
    const docRef = doc(db, 'cultivos', id);
    await updateDoc(docRef, datos);
  } catch (error) {
    console.error('Error al actualizar cultivo:', error);
    throw new Error('No se pudo actualizar el cultivo.');
  }
};

export const registrarCultivo = async (cultivo) => {
  try {
    await addDoc(collection(db, 'cultivos'), cultivo);
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo registrar el cultivo.');
  }
};