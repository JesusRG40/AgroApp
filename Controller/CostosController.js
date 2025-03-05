import { obtenerCostos, obtenerCostoPorId, eliminarCosto, getCultivos, agregarCosto, actualizarCosto } from "../Model/CostosModel";
import { Alert } from "react-native";
  
  // Función para obtener todos los registros de costos
  export const fetchCostos = async (setCostos, setFilteredCostos) => {
    try {
      const costosData = await obtenerCostos();
      setCostos(costosData);
      setFilteredCostos(costosData); // Inicialmente mostrar todos los registros
    } catch (error) {
      console.error(error);
    }
  };
  
  // Función para filtrar costos mediante búsqueda
  export const handleSearch = (text, costos, setSearchTerm, setFilteredCostos) => {
    setSearchTerm(text);
    if (text === "") {
      setFilteredCostos(costos);
    } else {
      const filtered = costos.filter((entry) =>
        entry.cultivoNombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCostos(filtered);
    }
  };
  
  // Función para obtener el detalle de un costo por su ID
  export const fetchCostoDetail = async (costoId, setCosto, setCultivoNombre, navigation) => {
    try {
      const costoData = await obtenerCostoPorId(costoId);
      setCosto(costoData);
      setCultivoNombre(costoData.cultivoNombre);
    } catch (error) {
      navigation.goBack();
    }
  };
  
  // Función para eliminar un registro de costo
  export const handleDeleteCosto = async (costoId, navigation) => {
    try {
      await eliminarCosto(costoId);
      Alert.alert("Éxito", "Costo eliminado correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el costo.");
    }
  };
  
  // Función para obtener la lista de cultivos (para seleccionar en formularios)
  export const fetchCultivosController = async (setCultivos) => {
    try {
      const cultivos = await getCultivos();
      setCultivos(cultivos);
    } catch (error) {
      console.error("Error al obtener cultivos:", error);
    }
  };
  
  // Función para agregar un nuevo registro de costo
  export const handleAddCostoController = async (
    selectedCultivo,
    tipoCosto,
    descripcionCosto,
    monto,
    fechaCosto,
    navigation
  ) => {
    try {
      await agregarCosto(selectedCultivo, tipoCosto, descripcionCosto, monto, fechaCosto);
      Alert.alert("Éxito", "Costo registrado correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  
  // Función para obtener el detalle de un costo (sin obtener el nombre del cultivo)
  export const fetchCostoDetailId = async (costoId, setCosto, navigation) => {
    try {
      const costoData = await obtenerCostoPorId(costoId);
      setCosto(costoData);
    } catch (error) {
      Alert.alert("Error", error.message);
      navigation.goBack();
    }
  };
  
  // Función para actualizar un registro de costo
  export const handleSaveCosto = async (costoId, costo, navigation) => {
    try {
      await actualizarCosto(costoId, costo);
      Alert.alert("Éxito", "Costo actualizado correctamente.");
      navigation.navigate("CostosList");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el costo.");
    }
  };  