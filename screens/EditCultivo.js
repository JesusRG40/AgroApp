import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function EditScreen({ route, navigation }) {
  const { cultivo } = route.params; // Recibir datos del cultivo

  const [nombre, setNombre] = useState(cultivo.nombre);
  const [fechaCultivado, setFechaCultivado] = useState(cultivo.fechaCultivado);
  const [fechaEstimada, setFechaEstimada] = useState(cultivo.fechaEstimada);
  const [fechaReal, setFechaReal] = useState(cultivo.fechaReal);
  const [estado, setEstado] = useState(cultivo.estado);

  const handleSave = async () => {
    try {
      const docRef = doc(db, "cultivos", cultivo.id);
      await updateDoc(docRef, {
        nombre,
        fechaCultivado,
        fechaEstimada,
        fechaReal,
        estado,
      });
      Alert.alert("Éxito", "Cultivo actualizado correctamente");
      navigation.navigate('CultivosList');
    } catch (error) {
      console.error("Error al actualizar cultivo:", error);
      Alert.alert("Error", "No se pudo actualizar el cultivo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cultivo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Cultivo"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha Cultivado (YYYY-MM-DD)"
        value={fechaCultivado}
        onChangeText={setFechaCultivado}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha Estimada (YYYY-MM-DD)"
        value={fechaEstimada}
        onChangeText={setFechaEstimada}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha Real (YYYY-MM-DD)"
        value={fechaReal}
        onChangeText={setFechaReal}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado del Cultivo"
        value={estado}
        onChangeText={setEstado}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
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