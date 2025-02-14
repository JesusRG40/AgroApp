import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import { fetchRiegos, handleSearch } from "../Controller/RiegosController";

export default function RiegosListScreen({ navigation }) {
  const [riegos, setRiegos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRiegos, setFilteredRiegos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchRiegos(setRiegos, setFilteredRiegos);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riegos</Text>

      <SearchBar
        placeholder="Buscar por cultivo"
        value={searchTerm}
        onChangeText={(text) => handleSearch(text, riegos, setSearchTerm, setFilteredRiegos)}
      />

      <FlatList
        data={filteredRiegos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("RiegoDetail", { riegoId: item.id })}
          >
            <View style={styles.riegoCard}>
              <Text style={styles.riegoText}>
                Fecha: {item.fechaRiego?.toDate().toLocaleDateString() || "No disponible"}
              </Text>
              <Text style={styles.riegoText}>Cultivo: {item.cultivoNombre || "No disponible"}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchTerm ? "No se encontraron resultados." : "No hay riegos registrados."}
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RegistrarRiego")}
      >
        <Text style={styles.addButtonText}>Registrar Riego</Text>
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
  riegoCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  riegoText: {
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
