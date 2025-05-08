import {obtenerAplicaciones, eliminarAplicacion, actualizarAplicacion, registrarAplicacion,} from '../Model/Aplicaciones_InsumoModel';
import { Alert } from 'react-native';
  
  // Obtiene todas las aplicaciones de insumo y las asigna al estado
  export const fetchAplicaciones = async (setAplicaciones) => {
    try {
      const data = await obtenerAplicaciones();
      setAplicaciones(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo cargar la lista de aplicaciones de insumo.');
    }
  };
  
  // Elimina una aplicación de insumo por su id
  export const handleEliminarAplicacion = async (id, navigation) => {
    try {
      await eliminarAplicacion(id);
      Alert.alert('Éxito', 'Aplicación eliminada correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar la aplicación de insumo.');
    }
  };

export const handleActualizarAplicacion = async (aplicacion, navigation) => {
  // Desestructuramos todos los campos, incluyendo las referencias
  const {
    id,
    cantidadAplicada,
    unidadMedida,
    metodoAplicacion,
    fechaAplicacion,
    estadoAplicacion,
    idCultivo,
    idInsumo,
  } = aplicacion;

  // Validamos que ninguno esté vacío o undefined
  if (
    cantidadAplicada === undefined ||
    cantidadAplicada === '' ||
    !unidadMedida.trim() ||
    !metodoAplicacion.trim() ||
    !fechaAplicacion.trim() ||
    !estadoAplicacion.trim() ||
    !idCultivo ||
    !idInsumo
  ) {
    Alert.alert('Atención', 'Por favor completa todos los campos obligatorios.');
    return;
  }

  try {
    // Llamamos al modelo pasando **todos** los campos,
    // incluyendo idCultivo e idInsumo para que también se puedan actualizar
    await actualizarAplicacion(id, {
      cantidadAplicada,
      unidadMedida,
      metodoAplicacion,
      fechaAplicacion,
      estadoAplicacion,
      idCultivo,
      idInsumo,
    });

    Alert.alert('Éxito', 'Aplicación de insumo actualizada correctamente.');
    navigation.navigate('CultivosList');
  } catch (error) {
    console.error('Error al actualizar aplicación de insumo:', error);
    Alert.alert('Error', 'No se pudo actualizar la aplicación de insumo.');
  }
};

  
  // Registra una nueva aplicación de insumo
  export const handleRegistrarAplicacion = async (aplicacion, navigation, refresh) => {
    const { cantidadAplicada, unidadMedida, metodoAplicacion, fechaAplicacion, estadoAplicacion, idCultivo, idInsumo } = aplicacion;
  
    if (
      cantidadAplicada === undefined || !unidadMedida || !metodoAplicacion || !fechaAplicacion || !estadoAplicacion || !idCultivo || !idInsumo) {
      Alert.alert('Atención', 'Por favor completa todos los campos obligatorios.');
      return;
    }
  
    try {
      await registrarAplicacion({cantidadAplicada, unidadMedida, metodoAplicacion, fechaAplicacion, estadoAplicacion, idCultivo, idInsumo,});
      Alert.alert('Éxito', 'Aplicación registrada correctamente.');
      if (refresh) refresh();
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar la aplicación de insumo.');
    }
  };