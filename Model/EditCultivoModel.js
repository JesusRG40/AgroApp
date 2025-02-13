import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const actualizarCultivo = async (id, datos) => {
  try {
    const docRef = doc(db, 'cultivos', id);
    await updateDoc(docRef, datos);
  } catch (error) {
    console.error('Error al actualizar cultivo:', error);
    throw new Error('No se pudo actualizar el cultivo.');
  }
};