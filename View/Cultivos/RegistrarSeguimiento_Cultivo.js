import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { handleRegistrarSeguimiento } from '../../Presenter/Seguimiento_CultivoPresenter';

export default function RegistrarSeguimiento({ navigation, route }) {
  // Se espera recibir el id del cultivo para asociarlo
  const idCultivo = route.params?.idCultivo;

  const [seguimiento, setSeguimiento] = useState({
    fechaRevision: '',
    estadoCultivo: '',
    observaciones: '',
    recomendaciones: '',
  });

  const handleChange = (key, value) => {
    setSeguimiento((prev) => ({ ...prev, [key]: value }));
  };

  const validarDatos = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!idCultivo) {
      Alert.alert('Error', 'No se ha especificado el cultivo asociado.');
      return false;
    }

    if (!dateRegex.test(seguimiento.fechaRevision)) {
      Alert.alert('Error', 'La fecha de revisión debe tener el formato YYYY-MM-DD.');
      return false;
    }

    if (seguimiento.estadoCultivo.trim() === '') {
      Alert.alert('Error', 'El estado del cultivo es obligatorio.');
      return false;
    }

    if (seguimiento.observaciones.trim() === '') {
      Alert.alert('Error', 'Las observaciones son obligatorias.');
      return false;
    }

    if (seguimiento.recomendaciones.trim() === '') {
      Alert.alert('Error', 'Las recomendaciones son obligatorias.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validarDatos()) {
      handleRegistrarSeguimiento(
        { ...seguimiento, idCultivo },
        navigation,
        route.params?.refresh
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Seguimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha de revisión (YYYY-MM-DD)"
        value={seguimiento.fechaRevision}
        onChangeText={(value) => handleChange('fechaRevision', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado del cultivo"
        value={seguimiento.estadoCultivo}
        onChangeText={(value) => handleChange('estadoCultivo', value)}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Observaciones"
        value={seguimiento.observaciones}
        onChangeText={(value) => handleChange('observaciones', value)}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Recomendaciones"
        value={seguimiento.recomendaciones}
        onChangeText={(value) => handleChange('recomendaciones', value)}
        multiline
        numberOfLines={4}
      />
      <Button title="Registrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});