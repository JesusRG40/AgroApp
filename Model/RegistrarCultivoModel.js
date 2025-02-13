import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const registrarCultivo = async (cultivo) => {
  try {
    await addDoc(collection(db, 'cultivos'), cultivo);
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo registrar el cultivo.');
  }
};