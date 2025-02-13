import { collection, getDocs } from 'firebase/firestore';
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