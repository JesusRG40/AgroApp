import { obtenerInsumoPorId, actualizarInsumo } from "../Model/EditInsumosModel";
import { Alert } from "react-native";

export const fetchInsumoDetail = async (insumoId, setInsumoData, navigation) => {
  try {
    const insumoData = await obtenerInsumoPorId(insumoId);
    setInsumoData({
      nombre: insumoData.nombre || "",
      tipo: insumoData.tipo || "",
      cantDisponible: insumoData.cantDisponible.toString() || "",
      unidadMedida: insumoData.unidadMedida || "",
    });
  } catch (error) {
    Alert.alert("Error", "No se pudo cargar la información del insumo.");
    navigation.goBack();
  }
};

export const handleSaveInsumo = async (insumoId, insumoData, navigation) => {
  const { nombre, tipo, cantDisponible, unidadMedida } = insumoData;

  if (!nombre || !tipo || !cantDisponible || !unidadMedida) {
    Alert.alert("Error", "Todos los campos son obligatorios.");
    return;
  }

  try {
    await actualizarInsumo(insumoId, {
      nombre,
      tipo,
      cantDisponible: parseFloat(cantDisponible),
      unidadMedida,
    });

    Alert.alert("Éxito", "Insumo actualizado correctamente.");
    navigation.navigate("InsumosList");
  } catch (error) {
    Alert.alert("Error", "No se pudo actualizar el insumo.");
  }
};
