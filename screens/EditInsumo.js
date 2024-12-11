import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function EditInsumoScreen({ route, navigation }) {
  const { insumoId } = route.params;
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [cantDisponible, setCantDisponible] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");

  // Obtener los datos actuales del insumo
  const fetchInsumoDetail = async () => {
    try {
      const insumoDoc = await getDoc(doc(db, "insumos", insumoId));
      if (insumoDoc.exists()) {
        const insumoData = insumoDoc.data();
        setNombre(insumoData.nombre || "");
        setTipo(insumoData.tipo || "");
        setCantDisponible(insumoData.cantDisponible.toString() || "");
        setUnidadMedida(insumoData.unidadMedida || "");
      } else {
        Alert.alert("Error", "Insumo no encontrado.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error al obtener los detalles del insumo: ", error);
      Alert.alert("Error", "No se pudo cargar la información del insumo.");
    }
  };

  useEffect(() => {
    fetchInsumoDetail();
  }, []);

  const handleSave = async () => {
    if (!nombre || !tipo || !cantDisponible || !unidadMedida) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      await updateDoc(doc(db, "insumos", insumoId), {
        nombre,
        tipo,
        cantDisponible: parseFloat(cantDisponible),
        unidadMedida,
      });

      Alert.alert("Éxito", "Insumo actualizado correctamente.");
      navigation.navigate("InsumosList");
    } catch (error) {
      console.error("Error al actualizar el insumo: ", error);
      Alert.alert("Error", "No se pudo actualizar el insumo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Insumo</Text>

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
        placeholder="Ingrese el tipo de insumo"
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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