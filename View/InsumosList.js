import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import { fetchInsumos, filtrarInsumos } from "../Controller/InsumosController";

export default function InsumosListScreen({ navigation }) {
  const [insumos, setInsumos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInsumos, setFilteredInsumos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchInsumos(setInsumos, setFilteredInsumos);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insumos</Text>
      <SearchBar placeholder="Buscar por nombre" value={searchTerm} onChangeText={(text) => filtrarInsumos(text, insumos, setSearchTerm, setFilteredInsumos)} />
      <FlatList
        data={filteredInsumos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("InsumoDetail", { insumoId: item.id })}>
            <View style={styles.insumoCard}>
              <Text style={styles.insumoText}>Nombre: {item.nombre || "No disponible"}</Text>
              <Text style={styles.insumoText}>Tipo: {item.tipo || "No disponible"}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>{searchTerm ? "No se encontraron resultados." : "No hay insumos registrados."}</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("RegistrarInsumo")}>
        <Text style={styles.addButtonText}>Registrar Insumo</Text>
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
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  insumoCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  insumoText: {
    fontSize: 16,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});