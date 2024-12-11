import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firestore configuration

export default function RegistrarCultivo({ navigation, route }) {
  const [nombre, setNombre] = useState('');
  const [fechaCultivado, setFechaCultivado] = useState('');
  const [fechaEstimada, setFechaEstimada] = useState('');
  const [fechaReal, setFechaReal] = useState('');
  const [estado, setEstado] = useState('');

  const handleRegistrarCultivo = async () => {
    if (!nombre || !fechaCultivado || !fechaEstimada || !estado) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      await addDoc(collection(db, 'cultivos'), {
        nombre,
        fechaCultivado,
        fechaEstimada,
        fechaReal: fechaReal || null,
        estado,
      });
      Alert.alert('Éxito', 'Cultivo registrado correctamente.');
      if (route.params?.refresh) route.params.refresh(); // Refrescar la lista de cultivos
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el cultivo.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del cultivo"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha en la que fue cultivado (YYYY-MM-DD)"
        value={fechaCultivado}
        onChangeText={setFechaCultivado}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de cosecha estimada (YYYY-MM-DD)"
        value={fechaEstimada}
        onChangeText={setFechaEstimada}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de cosecha real (YYYY-MM-DD, opcional)"
        value={fechaReal}
        onChangeText={setFechaReal}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado del cultivo"
        value={estado}
        onChangeText={setEstado}
      />
      <Button title="Registrar" onPress={handleRegistrarCultivo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
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
});