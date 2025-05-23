import {
  obtenerActividadesUsuario,
  eliminarActividadUsuario,
  actualizarActividadUsuario,
  registrarActividadUsuario,
} from '../Model/Actividades_UsuarioModel';
import { Alert } from 'react-native';

// Obtiene todas las actividades de usuario y las asigna al estado
export const fetchActividadesUsuario = async (setActividades) => {
  try {
    const data = await obtenerActividadesUsuario();
    setActividades(data);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo cargar la lista de actividades de usuario.');
  }
};

// Elimina una actividad de usuario por su id
export const handleEliminarActividadUsuario = async (id, navigation) => {
  try {
    await eliminarActividadUsuario(id);
    Alert.alert('Éxito', 'Actividad eliminada correctamente.');
    navigation.goBack();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo eliminar la actividad de usuario.');
  }
};

// Actualiza una actividad de usuario
export const handleActualizarActividadUsuario = async (actividad, navigation) => {
  const {
    id,
    tipoActividad,
    descripcionActividad,
    fechaActividad,
    estatusActividad,
    idUsuario,
    idCultivo,
  } = actividad;

  // Validación de campos obligatorios
  if (
    !tipoActividad?.trim() ||
    !descripcionActividad?.trim() ||
    !fechaActividad?.trim() ||
    !estatusActividad?.trim() ||
    !idUsuario ||
    !idCultivo
  ) {
    Alert.alert('Atención', 'Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    await actualizarActividadUsuario(id, {
      tipoActividad,
      descripcionActividad,
      fechaActividad,
      estatusActividad,
      idUsuario,
      idCultivo,
    });
    Alert.alert('Éxito', 'Actividad de usuario actualizada correctamente.');
    navigation.navigate('UsuariosList');
  } catch (error) {
    console.error('Error al actualizar actividad de usuario:', error);
    Alert.alert('Error', 'No se pudo actualizar la actividad de usuario.');
  }
};

// Registra una nueva actividad de usuario
export const handleRegistrarActividadUsuario = async (actividad, navigation, refresh) => {
  const {
    tipoActividad,
    descripcionActividad,
    fechaActividad,
    estatusActividad,
    idUsuario,
    idCultivo,
  } = actividad;

  // Validación de campos obligatorios
  if (
    !tipoActividad ||
    !descripcionActividad ||
    !fechaActividad ||
    !estatusActividad ||
    !idUsuario ||
    !idCultivo
  ) {
    Alert.alert('Atención', 'Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    await registrarActividadUsuario({
      tipoActividad,
      descripcionActividad,
      fechaActividad,
      estatusActividad,
      idUsuario,
      idCultivo,
    });
    Alert.alert('Éxito', 'Actividad registrada correctamente.');
    if (refresh) refresh();
    navigation.goBack();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo registrar la actividad de usuario.');
  }
};