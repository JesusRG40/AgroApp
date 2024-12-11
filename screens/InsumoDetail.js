import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function InsumoDetail({ route, navigation }) {
  const { insumoId } = route.params;
  const [insumo, setInsumo] = useState(null);

  // Obtener los datos del insumo
  const fetchInsumoDetail = async () => {
    try {
      const insumoDoc = await getDoc(doc(db, "insumos", insumoId));
      if (insumoDoc.exists()) {
        setInsumo(insumoDoc.data());
      } else {
        Alert.alert("Error", "Insumo no encontrado.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error al obtener detalles del insumo: ", error);
      Alert.alert("Error", "No se pudo obtener la información del insumo.");
    }
  };

  useEffect(() => {
    fetchInsumoDetail();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "insumos", insumoId));
      Alert.alert("Éxito", "Insumo eliminado correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al eliminar el insumo: ", error);
      Alert.alert("Error", "No se pudo eliminar el insumo.");
    }
  };

  if (!insumo) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del insumo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Insumo</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{insumo.nombre}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{insumo.tipo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cantidad Disponible:</Text>
        <Text style={styles.value}>{insumo.cantDisponible}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Unidad de Medida:</Text>
        <Text style={styles.value}>{insumo.unidadMedida}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFA726" }]}
        onPress={() => navigation.navigate("EditInsumo", { insumoId })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#EF5350" }]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
  },
  value: {
    fontSize: 16,
    color: "#777777",
  },
  button: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
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