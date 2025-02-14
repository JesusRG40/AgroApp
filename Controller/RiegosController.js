import { obtenerRiegos, obtenerRiegoPorId, eliminarRiego, getCultivos, addRiego, obtenerRiego, actualizarRiego } from "../Model/RiegosModel";
import { Alert } from "react-native";

export const fetchRiegos = async (setRiegos, setFilteredRiegos) => {
  try {
    const riegosData = await obtenerRiegos();
    setRiegos(riegosData);
    setFilteredRiegos(riegosData); // Inicialmente mostrar todos los riegos
  } catch (error) {
    console.error(error);
  }
};

export const handleSearch = (text, riegos, setSearchTerm, setFilteredRiegos) => {
  setSearchTerm(text);
  if (text === "") {
    setFilteredRiegos(riegos);
  } else {
    const filtered = riegos.filter((riego) =>
      riego.cultivoNombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRiegos(filtered);
  }
};

export const fetchRiegoDetail = async (riegoId, setRiego, setCultivoNombre, navigation) => {
  try {
    const riegoData = await obtenerRiegoPorId(riegoId);
    setRiego(riegoData);
    setCultivoNombre(riegoData.cultivoNombre);
  } catch (error) {
    navigation.goBack();
  }
};

export const handleDeleteRiego = async (riegoId, navigation) => {
  try {
    await eliminarRiego(riegoId);
    alert("Riego eliminado correctamente.");
    navigation.goBack();
  } catch (error) {
    alert("No se pudo eliminar el riego.");
  }
};

export const fetchCultivosController = async (setCultivos) => {
  const cultivos = await getCultivos();
  setCultivos(cultivos);
};

export const handleAddRiegoController = async (
  selectedCultivo,
  fechaRiego,
  cantAgua,
  duracionRiego,
  metodoRiego,
  navigation
) => {
  try {
    await addRiego(selectedCultivo, fechaRiego, cantAgua, duracionRiego, metodoRiego);
    alert("Éxito", "Riego registrado correctamente.");
    navigation.goBack();
  } catch (error) {
    alert("Error", error.message);
  }
};

export const fetchRiegoDetailId = async (riegoId, setRiego, navigation) => {
  try {
    const riegoData = await obtenerRiego(riegoId);
    setRiego(riegoData);
  } catch (error) {
    Alert.alert("Error", error.message);
    navigation.goBack();
  }
};

export const handleSaveRiego = async (riegoId, riego, navigation) => {
  try {
    await actualizarRiego(riegoId, riego);
    Alert.alert("Éxito", "Riego actualizado correctamente.");
    navigation.navigate("RiegosList");
  } catch (error) {
    Alert.alert("Error", "No se pudo actualizar el riego.");
  }
};