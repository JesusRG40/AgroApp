import { obtenerCultivos } from '../Model/CultivoModel';

export const fetchCultivos = async (setCultivos) => {
  try {
    const cultivosData = await obtenerCultivos();
    setCultivos(cultivosData);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo cargar la lista de cultivos.');
  }
};