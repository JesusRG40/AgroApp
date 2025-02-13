import { actualizarCultivo } from '../Model/EditCultivoModel';

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