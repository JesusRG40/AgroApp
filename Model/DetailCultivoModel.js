import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const eliminarCultivo = async (id) => {
  try {
    await deleteDoc(doc(db, 'cultivos', id));
  } catch (error) {
    console.error('Error al eliminar cultivo:', error);
    throw new Error('No se pudo eliminar el cultivo.');
  }
};