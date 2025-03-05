import React, { useState, useEffect } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, Platform,} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fetchCultivosController, handleAddHistorialSueloController } from "../Controller/Historial_SueloController";

export default function AddHistorialSueloScreen({ navigation }) {
  const [cultivos, setCultivos] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [fechaMedicion, setFechaMedicion] = useState("");
  const [nutrientes, setNutrientes] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [pH, setPH] = useState("");

  useEffect(() => {
    fetchCultivosController(setCultivos);
  }, []);

  const renderCultivoItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cultivoItem,
        selectedCultivo?.id === item.id && styles.cultivoSelected,
      ]}
      onPress={() => setSelectedCultivo(item)}
    >
      <Text style={styles.cultivoText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  const handleRegistrar = () => {
    // Validar que se haya seleccionado un cultivo
    if (!selectedCultivo) {
      Alert.alert("Error", "Seleccione un cultivo.");
      return;
    }
    // Validar formato de fecha (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fechaMedicion)) {
      Alert.alert("Error", "La fecha debe tener el formato YYYY-MM-DD.");
      return;
    }
    // Validar que se ingresen nutrientes y observaciones
    if (nutrientes.trim() === "") {
      Alert.alert("Error", "Ingrese los nutrientes.");
      return;
    }
    if (observaciones.trim() === "") {
      Alert.alert("Error", "Ingrese observaciones.");
      return;
    }
    // Validar que el pH sea un número entre 0 y 14
    const pHNumber = parseFloat(pH);
    if (isNaN(pHNumber) || pHNumber < 0 || pHNumber > 14) {
      Alert.alert("Error", "El pH debe ser un número entre 0 y 14.");
      return;
    }

    // Llamada al controlador para registrar el historial
    handleAddHistorialSueloController(
      selectedCultivo,
      fechaMedicion,
      nutrientes,
      observaciones,
      pH,
      navigation
    );
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Registrar Nuevo Historial de Suelo</Text>

      <Text style={styles.label}>Seleccionar Cultivo:</Text>
      <FlatList
        data={cultivos}
        keyExtractor={(item) => item.id}
        renderItem={renderCultivoItem}
        style={styles.cultivoList}
        nestedScrollEnabled={true}
      />

      <Text style={styles.label}>Fecha de Medición (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={fechaMedicion}
        onChangeText={setFechaMedicion}
        placeholder="Ingrese la fecha de medición"
      />

      <Text style={styles.label}>Nutrientes:</Text>
      <TextInput
        style={styles.input}
        value={nutrientes}
        onChangeText={setNutrientes}
        placeholder="Ingrese los nutrientes"
      />

      <Text style={styles.label}>Observaciones:</Text>
      <TextInput
        style={styles.input}
        value={observaciones}
        onChangeText={setObservaciones}
        placeholder="Ingrese observaciones"
      />

      <Text style={styles.label}>pH:</Text>
      <TextInput
        style={styles.input}
        value={pH}
        onChangeText={setPH}
        placeholder="Ingrese el pH"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleRegistrar}>
        <Text style={styles.addButtonText}>Registrar</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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