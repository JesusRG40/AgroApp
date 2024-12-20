import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AddInsumoScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [cantDisponible, setCantDisponible] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");

  const handleAddInsumo = async () => {
    if (!nombre || !tipo || !cantDisponible || !unidadMedida) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, "insumos"), {
        nombre,
        tipo,
        cantDisponible: parseFloat(cantDisponible),
        unidadMedida,
      });

      Alert.alert("Éxito", "Insumo registrado correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar insumo: ", error);
      Alert.alert("Error", "No se pudo registrar el insumo.");
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

      <TouchableOpacity style={styles.addButton} onPress={handleAddInsumo}>
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