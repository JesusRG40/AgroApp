import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { handleActualizarSeguimiento } from '../../Presenter/Seguimiento_CultivoPresenter';

export default function EditSeguimientoScreen({ route, navigation }) {
  const { seguimiento } = route.params;

  const [datos, setDatos] = useState({
    id: seguimiento.id,
    fechaRevision: seguimiento.fechaRevision
      ? seguimiento.fechaRevision.toDate
        ? seguimiento.fechaRevision.toDate().toISOString().split('T')[0]
        : new Date(seguimiento.fechaRevision).toISOString().split('T')[0]
      : '',
    estadoCultivo: seguimiento.estadoCultivo || '',
    observaciones: seguimiento.observaciones || '',
    recomendaciones: seguimiento.recomendaciones || '',
    idCultivo: seguimiento.idCultivo || null,
  });

  const handleChange = (key, value) => {
    setDatos(prev => ({ ...prev, [key]: value }));
  };

  const validarDatos = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(datos.fechaRevision)) {
      Alert.alert('Error', 'La fecha de revisión debe tener el formato YYYY-MM-DD.');
      return false;
    }
    if (datos.estadoCultivo.trim() === '') {
      Alert.alert('Error', 'El estado del cultivo es obligatorio.');
      return false;
    }
    if (datos.observaciones.trim() === '') {
      Alert.alert('Error', 'Las observaciones son obligatorias.');
      return false;
    }
    if (datos.recomendaciones.trim() === '') {
      Alert.alert('Error', 'Las recomendaciones son obligatorias.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validarDatos()) {
      handleActualizarSeguimiento(
        datos,
        navigation
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Seguimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha de revisión (YYYY-MM-DD)"
        value={datos.fechaRevision}
        onChangeText={value => handleChange('fechaRevision', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado del cultivo"
        value={datos.estadoCultivo}
        onChangeText={value => handleChange('estadoCultivo', value)}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Observaciones"
        multiline
        numberOfLines={4}
        value={datos.observaciones}
        onChangeText={value => handleChange('observaciones', value)}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Recomendaciones"
        multiline
        numberOfLines={4}
        value={datos.recomendaciones}
        onChangeText={value => handleChange('recomendaciones', value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});