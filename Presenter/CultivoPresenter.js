import { obtenerCultivos, eliminarCultivo, actualizarCultivo, registrarCultivo } from '../Model/CultivoModel';

export const fetchCultivos = async (setCultivos) => {
  try {
    const cultivosData = await obtenerCultivos();
    setCultivos(cultivosData);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo cargar la lista de cultivos.');
  }
};

export const handleEliminarCultivo = async (id, navigation) => {
  try {
    await eliminarCultivo(id);
    alert('Cultivo eliminado correctamente.');
    navigation.goBack();
  } catch (error) {
    alert('No se pudo eliminar el cultivo.');
  }
};

export const handleActualizarCultivo = async (cultivo, navigation) => {
  const { id, nombre, fechaCultivado, fechaEstimada, estado } = cultivo;

  if (!nombre || !fechaCultivado || !fechaEstimada || !estado) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    await actualizarCultivo(id, cultivo);
    alert('Cultivo actualizado correctamente.');
    navigation.navigate('CultivosList');
  } catch (error) {
    alert('No se pudo actualizar el cultivo.');
  }
};

export const handleRegistrarCultivo = async (cultivo, navigation, refresh) => {
  const { nombre, fechaCultivado, fechaEstimada, estado } = cultivo;

  if (!nombre || !fechaCultivado || !fechaEstimada || !estado) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    await registrarCultivo(cultivo);
    alert('Cultivo registrado correctamente.');
    if (refresh) refresh(); // Refrescar la lista de cultivos
    navigation.goBack();
  } catch (error) {
    alert('No se pudo registrar el cultivo.');
  }
};