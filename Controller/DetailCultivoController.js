import { eliminarCultivo } from '../Model/DetailCultivoModel';

export const handleEliminarCultivo = async (id, navigation) => {
  try {
    await eliminarCultivo(id);
    alert('Cultivo eliminado correctamente.');
    navigation.goBack();
  } catch (error) {
    alert('No se pudo eliminar el cultivo.');
  }
};