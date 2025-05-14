// Presenter/UsuarioPresenter.js
import {obtenerUsuarios, eliminarUsuario, actualizarUsuario, registrarUsuario,} from '../Model/UsuariosModel';
import { Alert } from 'react-native';

// Obtiene todos los usuarios y los asigna al estado
export const fetchUsuarios = async (setUsuarios, setFilteredUsuarios) => {
  try {
    const data = await obtenerUsuarios();
    setUsuarios(data);
    setFilteredUsuarios(data);  // ✳ inicializa aquí el filtered también
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo cargar la lista de usuarios.');
  }
};

// Elimina un usuario por su id
export const handleEliminarUsuario = async (id, navigation) => {
  try {
    await eliminarUsuario(id);
    Alert.alert('Éxito', 'Usuario eliminado correctamente.');
    navigation.goBack();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo eliminar el usuario.');
  }
};

// Actualiza un usuario existente
export const handleActualizarUsuario = async (usuario, navigation) => {
  const { id, nombre, telefono, estatus, password, email, rol } = usuario;

  if (!nombre || !telefono || estatus === undefined || !password || !email || !rol) {
    Alert.alert('Atención', 'Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    await actualizarUsuario(id, { nombre, telefono, estatus, password, email, rol });
    Alert.alert('Éxito', 'Usuario actualizado correctamente.');
    navigation.navigate('UsuariosList');
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo actualizar el usuario.');
  }
};

// Registra un nuevo usuario
export const handleRegistrarUsuario = async (usuario, navigation, refresh) => {
  const { nombre, telefono, estatus, password, email, rol } = usuario;

  if (!nombre || !telefono || estatus === undefined || !password || !email || !rol) {
    Alert.alert('Atención', 'Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    await registrarUsuario({ nombre, telefono, estatus, password, email, rol });
    Alert.alert('Éxito', 'Usuario registrado correctamente.');
    if (refresh) refresh();
    navigation.goBack();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo registrar el usuario.');
  }
};

export const filtrarUsuarios = (term, allUsuarios, setTerm, setFiltered) => {
  setTerm(term);
  const lower = term.toLowerCase();
  const filtered = allUsuarios.filter(u =>
    u.nombre.toLowerCase().includes(lower) ||
    u.email.toLowerCase().includes(lower)
  );
  setFiltered(filtered);
};