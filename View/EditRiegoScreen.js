import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { fetchRiegoDetailId, handleSaveRiego } from "../Controller/RiegosController";

export default function EditRiegoScreen({ route, navigation }) {
  const { riegoId } = route.params;
  const [riego, setRiego] = useState(null);

  useEffect(() => {
    fetchRiegoDetailId(riegoId, setRiego, navigation);
  }, []);

  const validarDatos = () => {
    if (!riego.cantAgua || riego.cantAgua <= 0 || isNaN(riego.cantAgua)) {
      Alert.alert("Error", "La cantidad de agua debe ser un número positivo.");
      return false;
    }
    if (!riego.duracionRiego || riego.duracionRiego <= 0 || isNaN(riego.duracionRiego)) {
      Alert.alert("Error", "La duración del riego debe ser un número positivo.");
      return false;
    }
    if (!riego.metodoRiego.trim()) {
      Alert.alert("Error", "El método de riego no puede estar vacío.");
      return false;
    }
    return true;
  };

  const handleGuardar = () => {
    if (validarDatos()) {
      handleSaveRiego(riegoId, riego, navigation);
    }
  };

  if (!riego) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del riego...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Riego</Text>

      <Text style={styles.label}>Cantidad de Agua (litros):</Text>
      <TextInput
        style={styles.input}
        value={riego.cantAgua !== null ? String(riego.cantAgua) : ""}
        onChangeText={(text) => setRiego({ ...riego, cantAgua: text ? parseFloat(text) : null })}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Duración del Riego (minutos):</Text>
      <TextInput
        style={styles.input}
        value={riego.duracionRiego !== null ? String(riego.duracionRiego) : ""}
        onChangeText={(text) => setRiego({ ...riego, duracionRiego: text ? parseInt(text) : null })}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Método de Riego:</Text>
      <TextInput
        style={styles.input}
        value={riego.metodoRiego}
        onChangeText={(text) => setRiego({ ...riego, metodoRiego: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    color: "#777777",
    textAlign: "center",
  },
});