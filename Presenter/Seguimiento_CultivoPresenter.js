import { obtenerSeguimientos, eliminarSeguimiento, actualizarSeguimiento, registrarSeguimiento } from '../Model/Seguimiento_CultivoModel';
import { Alert } from 'react-native';

// Obtiene todos los seguimientos registrados y los asigna al estado
export const fetchSeguimientos = async (setSeguimientos) => {
  try {
    const data = await obtenerSeguimientos();
    setSeguimientos(data);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo cargar la lista de seguimientos de cultivo.');
  }
};

// Elimina un seguimiento por su id
export const handleEliminarSeguimiento = async (id, navigation) => {
  try {
    await eliminarSeguimiento(id);
    Alert.alert('Éxito', 'Seguimiento eliminado correctamente.');
    navigation.goBack();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo eliminar el seguimiento de cultivo.');
  }
};

// Actualiza un seguimiento existente
export const handleActualizarSeguimiento = async (seguimiento, navigation) => {
  const { id, fechaRevision, estadoCultivo, observaciones, recomendaciones, idCultivo } = seguimiento;

  if (!fechaRevision || !estadoCultivo || !observaciones || !recomendaciones || !idCultivo) {
    Alert.alert('Atención', 'Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    await actualizarSeguimiento(id, { fechaRevision, estadoCultivo, observaciones, recomendaciones, idCultivo });
    Alert.alert('Éxito', 'Seguimiento actualizado correctamente.');
    navigation.navigate('CultivosList');
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo actualizar el seguimiento de cultivo.');
  }
};

// Registra un nuevo seguimiento de cultivo
export const handleRegistrarSeguimiento = async (seguimiento, navigation, refresh) => {
  const { fechaRevision, estadoCultivo, observaciones, recomendaciones, idCultivo } = seguimiento;

  if (!fechaRevision || !estadoCultivo || !observaciones || !recomendaciones || !idCultivo) {
    Alert.alert('Atención', 'Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    await registrarSeguimiento({ fechaRevision, estadoCultivo, observaciones, recomendaciones, idCultivo });
    Alert.alert('Éxito', 'Seguimiento registrado correctamente.');
    if (refresh) refresh();
    navigation.goBack();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo registrar el seguimiento de cultivo.');
  }
};