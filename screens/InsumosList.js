import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../components/SearchBar"; // Importar el componente SearchBar

export default function InsumosListScreen({ navigation }) {
  const [insumos, setInsumos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInsumos, setFilteredInsumos] = useState([]);

  // Obtener los insumos desde Firestore
  const fetchInsumos = async () => {
    try {
      const insumosSnapshot = await getDocs(collection(db, "insumos"));
      const insumosList = insumosSnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setInsumos(insumosList);
      setFilteredInsumos(insumosList); // Inicialmente mostrar todos los insumos
    } catch (error) {
      console.error("Error al obtener los insumos: ", error);
    }
  };

  // Filtrar los insumos según el término de búsqueda
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === "") {
      setFilteredInsumos(insumos); // Mostrar todos si no hay término de búsqueda
    } else {
      const filtered = insumos.filter((insumo) =>
        insumo.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredInsumos(filtered);
    }
  };

  // Usar useFocusEffect para recargar los datos al volver a la pantalla
  useFocusEffect(
    React.useCallback(() => {
      fetchInsumos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insumos</Text>

      {/* Barra de búsqueda personalizada */}
      <SearchBar
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {/* Lista de insumos */}
      <FlatList
        data={filteredInsumos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("InsumoDetail", { insumoId: item.id })}
          >
            <View style={styles.insumoCard}>
              <Text style={styles.insumoText}>Nombre: {item.nombre || "No disponible"}</Text>
              <Text style={styles.insumoText}>Tipo: {item.tipo || "No disponible"}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchTerm ? "No se encontraron resultados." : "No hay insumos registrados."}
          </Text>
        }
      />

      {/* Botón para registrar un nuevo insumo */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RegistrarInsumo")}
      >
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