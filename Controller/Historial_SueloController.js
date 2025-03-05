import { obtenerHistorialSuelo, obtenerHistorialSueloPorId, eliminarHistorialSuelo, getCultivos, addHistorialSuelo, actualizarHistorialSuelo } from "../Model/Historial_SueloModel";
import { Alert } from "react-native";
  
  export const fetchHistorialSuelo = async (setHistorial, setFilteredHistorial) => {
    try {
      const historialData = await obtenerHistorialSuelo();
      setHistorial(historialData);
      setFilteredHistorial(historialData); // Inicialmente mostrar todos los registros
    } catch (error) {
      console.error(error);
    }
  };
  
  export const handleSearch = (text, historial, setSearchTerm, setFilteredHistorial) => {
    setSearchTerm(text);
    if (text === "") {
      setFilteredHistorial(historial);
    } else {
      const filtered = historial.filter((entry) =>
        entry.cultivoNombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredHistorial(filtered);
    }
  };
  
  export const fetchHistorialSueloDetail = async (historialId, setHistorial, setCultivoNombre, navigation) => {
    try {
      const historialData = await obtenerHistorialSueloPorId(historialId);
      setHistorial(historialData);
      setCultivoNombre(historialData.cultivoNombre);
    } catch (error) {
      navigation.goBack();
    }
  };
  
  export const handleDeleteHistorialSuelo = async (historialId, navigation) => {
    try {
      await eliminarHistorialSuelo(historialId);
      alert("Historial de suelo eliminado correctamente.");
      navigation.goBack();
    } catch (error) {
      alert("No se pudo eliminar el historial de suelo.");
    }
  };
  
  export const fetchCultivosController = async (setCultivos) => {
    try {
      const cultivos = await getCultivos();
      setCultivos(cultivos);
    } catch (error) {
      console.error("Error al obtener cultivos:", error);
    }
  };
  
  export const handleAddHistorialSueloController = async (
    selectedCultivo,
    fechaMedicion,
    nutrientes,
    observaciones,
    pH,
    navigation
  ) => {
    try {
      await addHistorialSuelo(selectedCultivo, fechaMedicion, nutrientes, observaciones, pH);
      alert("Éxito", "Historial de suelo registrado correctamente.");
      navigation.goBack();
    } catch (error) {
      alert("Error", error.message);
    }
  };
  
  export const fetchHistorialSueloDetailId = async (historialId, setHistorial, navigation) => {
    try {
      const historialData = await obtenerHistorialSueloPorId(historialId);
      setHistorial(historialData);
    } catch (error) {
      Alert.alert("Error", error.message);
      navigation.goBack();
    }
  };
  
  export const handleSaveHistorialSuelo = async (historialId, historial, navigation) => {
    try {
      await actualizarHistorialSuelo(historialId, historial);
      Alert.alert("Éxito", "Historial de suelo actualizado correctamente.");
      navigation.navigate("HistorialList");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el historial de suelo.");
    }
  };  