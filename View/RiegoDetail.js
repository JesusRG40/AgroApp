import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchRiegoDetail, handleDeleteRiego } from "../Controller/RiegosController";

export default function RiegoDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { riegoId } = route.params;
  const [riego, setRiego] = useState(null);
  const [cultivoNombre, setCultivoNombre] = useState("Cargando...");

  useEffect(() => {
    fetchRiegoDetail(riegoId, setRiego, setCultivoNombre, navigation);
  }, []);

  if (!riego) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del riego...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Riego</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha del Riego:</Text>
        <Text style={styles.value}>{new Date(riego.fechaRiego.seconds * 1000).toLocaleDateString()}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cultivo Asociado:</Text>
        <Text style={styles.value}>{cultivoNombre}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cantidad de Agua:</Text>
        <Text style={styles.value}>{riego.cantAgua} litros</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Duración del Riego:</Text>
        <Text style={styles.value}>{riego.duracionRiego} minutos</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Método de Riego:</Text>
        <Text style={styles.value}>{riego.metodoRiego || "No especificado"}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFA726" }]}
        onPress={() => navigation.navigate("EditRiego", { riegoId })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#EF5350" }]}
        onPress={() => handleDeleteRiego(riegoId, navigation)}
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