// screens/EditarAplicacionScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { handleActualizarAplicacion } from '../../Presenter/Aplicaciones_InsumoPresenter';

const { width } = Dimensions.get('window');

export default function EditarAplicacionScreen({ route, navigation }) {
  const { aplicacion } = route.params;

  const [datos, setDatos] = useState({
    id: aplicacion.id,
    cantidadAplicada: aplicacion.cantidadAplicada != null
      ? aplicacion.cantidadAplicada.toString()
      : '',
    unidadMedida: aplicacion.unidadMedida || '',
    metodoAplicacion: aplicacion.metodoAplicacion || '',
    fechaAplicacion: aplicacion.fechaAplicacion?.toDate
      ? aplicacion.fechaAplicacion.toDate().toISOString().split('T')[0]
      : aplicacion.fechaAplicacion
        ? new Date(aplicacion.fechaAplicacion).toISOString().split('T')[0]
        : '',
    estadoAplicacion: aplicacion.estadoAplicacion || '',
    idCultivo: aplicacion.idCultivo,
    idInsumo: aplicacion.idInsumo,
  });

  const handleChange = (key, value) => {
    setDatos(prev => ({ ...prev, [key]: value }));
  };

  const validarDatos = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const cant = parseFloat(datos.cantidadAplicada);

    if (isNaN(cant) || cant <= 0) {
      Alert.alert('Error', 'La cantidad aplicada debe ser un número positivo.');
      return false;
    }
    if (!datos.unidadMedida.trim()) {
      Alert.alert('Error', 'La unidad de medida es obligatoria.');
      return false;
    }
    if (!datos.metodoAplicacion.trim()) {
      Alert.alert('Error', 'El método de aplicación es obligatorio.');
      return false;
    }
    if (!dateRegex.test(datos.fechaAplicacion)) {
      Alert.alert('Error', 'La fecha debe tener el formato YYYY-MM-DD.');
      return false;
    }
    if (!datos.estadoAplicacion.trim()) {
      Alert.alert('Error', 'El estado de la aplicación es obligatorio.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validarDatos()) return;
    handleActualizarAplicacion(datos, navigation);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Aplicación</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Cantidad Aplicada</Text>
        <TextInput
          style={styles.input}
          placeholder="2.5"
          keyboardType="numeric"
          value={datos.cantidadAplicada}
          onChangeText={v => handleChange('cantidadAplicada', v)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Unidad de Medida</Text>
        <TextInput
          style={styles.input}
          placeholder="kg, L"
          value={datos.unidadMedida}
          onChangeText={v => handleChange('unidadMedida', v)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Método de Aplicación</Text>
        <TextInput
          style={styles.input}
          placeholder="Pulverización"
          value={datos.metodoAplicacion}
          onChangeText={v => handleChange('metodoAplicacion', v)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Fecha de Aplicación</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={datos.fechaAplicacion}
          onChangeText={v => handleChange('fechaAplicacion', v)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Estado de Aplicación</Text>
        <TextInput
          style={styles.input}
          placeholder="Completo, Pendiente"
          value={datos.estadoAplicacion}
          onChangeText={v => handleChange('estadoAplicacion', v)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#EFEFF4',
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    // sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevación para Android
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // fijarlo al fondo con ancho total
    alignSelf: 'center',
    width: width * 0.9,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});