import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { handleActualizarCultivo } from '../../Presenter/CultivoPresenter';

export default function EditScreen({ route, navigation }) {
  const { cultivo } = route.params; // Recibir datos del cultivo

  const [datos, setDatos] = useState({
    id: cultivo.id,
    nombre: cultivo.nombre,
    fechaCultivado: cultivo.fechaCultivado,
    fechaEstimada: cultivo.fechaEstimada,
    fechaReal: cultivo.fechaReal,
    estado: cultivo.estado,
  });

  const handleChange = (key, value) => {
    setDatos((prev) => ({ ...prev, [key]: value }));
  };

  const validarDatos = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (datos.nombre.trim() === '') {
      Alert.alert('Error', 'El nombre del cultivo es obligatorio.');
      return false;
    }

    if (!dateRegex.test(datos.fechaCultivado)) {
      Alert.alert('Error', 'La fecha de cultivo debe tener el formato YYYY-MM-DD.');
      return false;
    }

    if (!dateRegex.test(datos.fechaEstimada)) {
      Alert.alert('Error', 'La fecha estimada de cosecha debe tener el formato YYYY-MM-DD.');
      return false;
    }

    if (datos.fechaReal && !dateRegex.test(datos.fechaReal)) {
      Alert.alert('Error', 'La fecha real de cosecha debe tener el formato YYYY-MM-DD.');
      return false;
    }

    if (datos.estado.trim() === '') {
      Alert.alert('Error', 'El estado del cultivo es obligatorio.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validarDatos()) {
      handleActualizarCultivo(datos, navigation);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cultivo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Cultivo"
        value={datos.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha Cultivado (YYYY-MM-DD)"
        value={datos.fechaCultivado}
        onChangeText={(value) => handleChange('fechaCultivado', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha Estimada (YYYY-MM-DD)"
        value={datos.fechaEstimada}
        onChangeText={(value) => handleChange('fechaEstimada', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha Real (YYYY-MM-DD)"
        value={datos.fechaReal}
        onChangeText={(value) => handleChange('fechaReal', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado del Cultivo"
        value={datos.estado}
        onChangeText={(value) => handleChange('estado', value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});