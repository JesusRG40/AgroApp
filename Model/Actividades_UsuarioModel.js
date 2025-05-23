import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Modelo de datos para la colección 'actividades_usuario'
export const obtenerActividadesUsuario = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'actividades_usuario'));
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error('Error obteniendo actividades de usuario:', error);
    throw new Error('No se pudo obtener la lista de actividades de usuario.');
  }
};

export const eliminarActividadUsuario = async (id) => {
  try {
    await deleteDoc(doc(db, 'actividades_usuario', id));
  } catch (error) {
    console.error('Error al eliminar actividad de usuario:', error);
    throw new Error('No se pudo eliminar la actividad de usuario.');
  }
};

export const actualizarActividadUsuario = async (id, datos) => {
  try {
    let fecha = datos.fechaActividad;
    if (typeof fecha === 'string') {
      fecha = new Date(fecha + 'T00:00:00');
    }

    const docRef = doc(db, 'actividades_usuario', id);

    await updateDoc(docRef, {
      ...datos,
      fechaActividad: fecha,
    });
  } catch (error) {
    console.error('Error al actualizar actividad de usuario:', error);
    throw new Error('No se pudo actualizar la actividad de usuario.');
  }
};

export const registrarActividadUsuario = async (actividad) => {
  try {
    const fecha = new Date(actividad.fechaActividad + 'T00:00:00');

    const usuarioRef = doc(db, 'usuarios', actividad.idUsuario);
    const cultivoRef = doc(db, 'cultivos', actividad.idCultivo);

    await addDoc(collection(db, 'actividades_usuario'), {
      tipoActividad: actividad.tipoActividad,
      descripcionActividad: actividad.descripcionActividad,
      fechaActividad: fecha,
      estatusActividad: actividad.estatusActividad,
      idUsuario: usuarioRef,
      idCultivo: cultivoRef,
    });
  } catch (error) {
    console.error('Error al registrar actividad de usuario:', error);
    throw new Error('No se pudo registrar la actividad de usuario.');
  }
};