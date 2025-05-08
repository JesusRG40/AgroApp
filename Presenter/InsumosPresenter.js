import { obtenerInsumos, obtenerInsumoPorId, eliminarInsumo, actualizarInsumo, registrarInsumo } from "../Model/InsumosModel";
import { Alert } from "react-native";

export const fetchInsumos = async (setInsumos, setFilteredInsumos) => {
  try {
    const insumosData = await obtenerInsumos();
    setInsumos(insumosData);

    // Verificar que setFilteredInsumos sea una función antes de llamarla
    if (typeof setFilteredInsumos === 'function') {
      setFilteredInsumos(insumosData);
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "No se pudo cargar la lista de insumos.");
  }
};

export const filtrarInsumos = (text, insumos, setSearchTerm, setFilteredInsumos) => {
  setSearchTerm(text);
  if (text === "") {
    setFilteredInsumos(insumos);
  } else {
    const filtered = insumos.filter((insumo) =>
      insumo.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredInsumos(filtered);
  }
};

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

export const handleAddInsumo = async (nombre, tipo, cantDisponible, unidadMedida, navigation) => {
  if (!nombre || !tipo || !cantDisponible || !unidadMedida) {
    Alert.alert("Error", "Todos los campos son obligatorios.");
    return;
  }

  const insumoData = {
    nombre,
    tipo,
    cantDisponible: parseFloat(cantDisponible),
    unidadMedida,
  };

  try {
    await registrarInsumo(insumoData);
    Alert.alert("Éxito", "Insumo registrado correctamente.");
    navigation.goBack();
  } catch (error) {
    Alert.alert("Error", "No se pudo registrar el insumo.");
  }
};