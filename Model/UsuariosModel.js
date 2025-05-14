// models/UsuarioModel.js
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudo obtener la lista de usuarios.');
  }
};

// Eliminar un usuario por ID
export const eliminarUsuario = async (id) => {
  try {
    await deleteDoc(doc(db, 'usuarios', id));
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw new Error('No se pudo eliminar el usuario.');
  }
};

// Actualizar un usuario por ID
export const actualizarUsuario = async (id, datos) => {
  try {
    const docRef = doc(db, 'usuarios', id);
    await updateDoc(docRef, {
      nombre: datos.nombre,
      telefono: datos.telefono,
      estatus: datos.estatus,
      password: datos.password,
      email: datos.email,
      rol: datos.rol,
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw new Error('No se pudo actualizar el usuario.');
  }
};

// Registrar un nuevo usuario
export const registrarUsuario = async (usuario) => {
  try {
    await addDoc(collection(db, 'usuarios'), {
      nombre: usuario.nombre,
      telefono: usuario.telefono,
      estatus: usuario.estatus,
      password: usuario.password,
      email: usuario.email,
      rol: usuario.rol,
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw new Error('No se pudo registrar el usuario.');
  }
};