import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from "react-native";
import { fetchCultivosController, handleAddRiegoController } from "../Controller/RiegosController";

export default function AddRiegoScreen({ navigation }) {
  const [cultivos, setCultivos] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [fechaRiego, setFechaRiego] = useState("");
  const [cantAgua, setCantAgua] = useState("");
  const [duracionRiego, setDuracionRiego] = useState("");
  const [metodoRiego, setMetodoRiego] = useState("");

  useEffect(() => {
    fetchCultivosController(setCultivos);
  }, []);

  const renderCultivoItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.cultivoItem, selectedCultivo?.id === item.id && styles.cultivoSelected]}
      onPress={() => setSelectedCultivo(item)}
    >
      <Text style={styles.cultivoText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  const handleRegistrar = () => {
    if (!selectedCultivo) {
      Alert.alert("Error", "Seleccione un cultivo.");
      return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fechaRiego)) {
      Alert.alert("Error", "La fecha debe tener el formato YYYY-MM-DD.");
      return;
    }
    const cantAguaNumber = parseFloat(cantAgua);
    if (isNaN(cantAguaNumber) || cantAguaNumber <= 0) {
      Alert.alert("Error", "La cantidad de agua debe ser un número positivo.");
      return;
    }
    const duracionNumber = parseInt(duracionRiego, 10);
    if (isNaN(duracionNumber) || duracionNumber <= 0) {
      Alert.alert("Error", "La duración del riego debe ser un número positivo.");
      return;
    }
    if (metodoRiego.trim() === "") {
      Alert.alert("Error", "Ingrese el método de riego.");
      return;
    }
    
    handleAddRiegoController(selectedCultivo, fechaRiego, cantAgua, duracionRiego, metodoRiego, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Nuevo Riego</Text>
      <Text style={styles.label}>Seleccionar Cultivo:</Text>
      <FlatList data={cultivos} keyExtractor={(item) => item.id} renderItem={renderCultivoItem} style={styles.cultivoList} />
      <Text style={styles.label}>Fecha del Riego (YYYY-MM-DD):</Text>
      <TextInput style={styles.input} value={fechaRiego} onChangeText={setFechaRiego} placeholder="Ingrese la fecha del riego" />
      <Text style={styles.label}>Cantidad de Agua (litros):</Text>
      <TextInput style={styles.input} value={cantAgua} onChangeText={setCantAgua} placeholder="Ingrese la cantidad de agua" keyboardType="numeric" />
      <Text style={styles.label}>Duración del Riego (minutos):</Text>
      <TextInput style={styles.input} value={duracionRiego} onChangeText={setDuracionRiego} placeholder="Ingrese la duración del riego" keyboardType="numeric" />
      <Text style={styles.label}>Método de Riego:</Text>
      <TextInput style={styles.input} value={metodoRiego} onChangeText={setMetodoRiego} placeholder="Ingrese el método de riego" />
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
  cultivoList: {
    maxHeight: 150,
    marginBottom: 15,
  },
  cultivoItem: {
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 5,
  },
  cultivoSelected: {
    backgroundColor: "#D1E7DD",
    borderColor: "#A3CFBB",
  },
  cultivoText: {
    fontSize: 16,
    color: "#333",
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