import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fetchCultivosController, handleAddCostoController } from "../../Presenter/CostosPresenter";

export default function RegistrarCostoScreen({ navigation }) {
  const [cultivos, setCultivos] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [fechaCosto, setFechaCosto] = useState("");
  const [tipoCosto, setTipoCosto] = useState("");
  const [descripcionCosto, setDescripcionCosto] = useState("");
  const [monto, setMonto] = useState("");

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
    if (!dateRegex.test(fechaCosto)) {
      Alert.alert("Error", "La fecha debe tener el formato YYYY-MM-DD.");
      return;
    }
    // Validar que se ingrese el tipo de costo
    if (tipoCosto.trim() === "") {
      Alert.alert("Error", "Ingrese el tipo de costo.");
      return;
    }
    // Validar que se ingrese una descripción
    if (descripcionCosto.trim() === "") {
      Alert.alert("Error", "Ingrese la descripción del costo.");
      return;
    }
    // Validar que el monto sea un número positivo
    const montoNumber = parseFloat(monto);
    if (isNaN(montoNumber) || montoNumber < 0) {
      Alert.alert("Error", "El monto debe ser un número positivo.");
      return;
    }

    // Llamada al controlador para registrar el costo
    handleAddCostoController(
      selectedCultivo,
      tipoCosto,
      descripcionCosto,
      monto,
      fechaCosto,
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
      <Text style={styles.title}>Registrar Nuevo Costo</Text>

      <Text style={styles.label}>Seleccionar Cultivo:</Text>
      <FlatList
        data={cultivos}
        keyExtractor={(item) => item.id}
        renderItem={renderCultivoItem}
        style={styles.cultivoList}
        nestedScrollEnabled={true}
      />

      <Text style={styles.label}>Fecha del Costo (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={fechaCosto}
        onChangeText={setFechaCosto}
        placeholder="Ingrese la fecha del costo"
      />

      <Text style={styles.label}>Tipo de Costo:</Text>
      <TextInput
        style={styles.input}
        value={tipoCosto}
        onChangeText={setTipoCosto}
        placeholder="Ingrese el tipo de costo"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcionCosto}
        onChangeText={setDescripcionCosto}
        placeholder="Ingrese la descripción del costo"
        multiline={true}
      />

      <Text style={styles.label}>Monto:</Text>
      <TextInput
        style={styles.input}
        value={monto}
        onChangeText={setMonto}
        placeholder="Ingrese el monto"
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