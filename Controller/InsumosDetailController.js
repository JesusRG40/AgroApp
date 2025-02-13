import { obtenerInsumoPorId, eliminarInsumo } from "../Model/InsumosDetailModel";
import { Alert } from "react-native";

export const fetchInsumoDetail = async (insumoId, setInsumo, navigation) => {
  try {
    const insumoData = await obtenerInsumoPorId(insumoId);
    setInsumo(insumoData);
  } catch (error) {
    Alert.alert("Error", "No se pudo obtener la información del insumo.");
    navigation.goBack();
  }
};

export const handleDeleteInsumo = async (insumoId, navigation) => {
  try {
    await eliminarInsumo(insumoId);
    Alert.alert("Éxito", "Insumo eliminado correctamente.");
    navigation.goBack();
  } catch (error) {
    Alert.alert("Error", "No se pudo eliminar el insumo.");
  }
};
