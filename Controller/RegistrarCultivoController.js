import { registrarCultivo } from '../Model/RegistrarCultivoModel';

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