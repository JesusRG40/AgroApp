import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { handleAddInsumo } from "../Controller/InsumosController";

export default function AddInsumoScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [cantDisponible, setCantDisponible] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");

  const validarDatos = () => {
    if (!nombre.trim() || !tipo.trim() || !cantDisponible.trim() || !unidadMedida.trim()) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return false;
    }
    if (isNaN(cantDisponible) || parseFloat(cantDisponible) <= 0) {
      Alert.alert("Error", "La cantidad disponible debe ser un número válido y mayor a 0.");
      return false;
    }
    return true;
  };

  const handleRegistrar = () => {
    if (validarDatos()) {
      handleAddInsumo(nombre, tipo, cantDisponible, unidadMedida, navigation);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Nuevo Insumo</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese el nombre del insumo"
      />

      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Ingrese el tipo del insumo"
      />

      <Text style={styles.label}>Cantidad Disponible:</Text>
      <TextInput
        style={styles.input}
        value={cantDisponible}
        onChangeText={setCantDisponible}
        placeholder="Ingrese la cantidad disponible"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Unidad de Medida:</Text>
      <TextInput
        style={styles.input}
        value={unidadMedida}
        onChangeText={setUnidadMedida}
        placeholder="Ingrese la unidad de medida"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleRegistrar}>
        <Text style={styles.addButtonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});