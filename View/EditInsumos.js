import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { fetchInsumoDetail, handleSaveInsumo } from "../Controller/InsumosController";

export default function EditInsumoScreen({ route, navigation }) {
  const { insumoId } = route.params;
  const [insumoData, setInsumoData] = useState({
    nombre: "",
    tipo: "",
    cantDisponible: "",
    unidadMedida: "",
  });

  useEffect(() => {
    fetchInsumoDetail(insumoId, setInsumoData, navigation);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Insumo</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={insumoData.nombre}
        onChangeText={(text) => setInsumoData({ ...insumoData, nombre: text })}
        placeholder="Ingrese el nombre del insumo"
      />

      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        style={styles.input}
        value={insumoData.tipo}
        onChangeText={(text) => setInsumoData({ ...insumoData, tipo: text })}
        placeholder="Ingrese el tipo de insumo"
      />

      <Text style={styles.label}>Cantidad Disponible:</Text>
      <TextInput
        style={styles.input}
        value={insumoData.cantDisponible}
        onChangeText={(text) => setInsumoData({ ...insumoData, cantDisponible: text })}
        placeholder="Ingrese la cantidad disponible"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Unidad de Medida:</Text>
      <TextInput
        style={styles.input}
        value={insumoData.unidadMedida}
        onChangeText={(text) => setInsumoData({ ...insumoData, unidadMedida: text })}
        placeholder="Ingrese la unidad de medida"
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveInsumo(insumoId, insumoData, navigation)}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
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
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
