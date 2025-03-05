import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchCostoDetail, handleDeleteCosto } from "../Controller/CostosController";

export default function CostosDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { costoId } = route.params;
  const [costo, setCosto] = useState(null);
  const [cultivoNombre, setCultivoNombre] = useState("Cargando...");

  useEffect(() => {
    fetchCostoDetail(costoId, setCosto, setCultivoNombre, navigation);
  }, []);

  if (!costo) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del costo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Costo</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha del Costo:</Text>
        <Text style={styles.value}>
          {new Date(costo.fechaCosto.seconds * 1000).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cultivo Asociado:</Text>
        <Text style={styles.value}>{cultivoNombre}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tipo de Costo:</Text>
        <Text style={styles.value}>{costo.tipoCosto}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={[styles.value, styles.description]}>
          {costo.descripcionCosto}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.value}>
          {costo.monto !== undefined ? `$${costo.monto}` : "No disponible"}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFA726" }]}
        onPress={() => navigation.navigate("EditCosto", { costoId })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#EF5350" }]}
        onPress={() => handleDeleteCosto(costoId, navigation)}
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
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#777777",
  },
  description: {
    // Permite que el texto se ajuste a la pantalla
    flexWrap: "wrap",
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