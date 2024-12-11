import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../components/SearchBar"; // Importar el componente SearchBar

export default function RiegosListScreen({ navigation }) {
  const [riegos, setRiegos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRiegos, setFilteredRiegos] = useState([]);

  // Obtener los riegos desde Firestore
  const fetchRiegos = async () => {
    try {
      const riegosSnapshot = await getDocs(collection(db, "riegos"));
      const riegosList = await Promise.all(
        riegosSnapshot.docs.map(async (docSnap) => {
          const riego = { id: docSnap.id, ...docSnap.data() };

          // Obtener el nombre del cultivo desde la referencia
          if (riego.Cultivo) {
            const cultivoDoc = await getDoc(riego.Cultivo);
            riego.cultivoNombre = cultivoDoc.exists() ? cultivoDoc.data().nombre : "No disponible";
          } else {
            riego.cultivoNombre = "No disponible";
          }

          return riego;
        })
      );
      setRiegos(riegosList);
      setFilteredRiegos(riegosList); // Inicialmente mostrar todos los riegos
    } catch (error) {
      console.error("Error al obtener los riegos: ", error);
    }
  };

  // Filtrar los riegos según el término de búsqueda
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === "") {
      setFilteredRiegos(riegos); // Mostrar todos si no hay término de búsqueda
    } else {
      const filtered = riegos.filter((riego) =>
        riego.cultivoNombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRiegos(filtered);
    }
  };

  // Usar useFocusEffect para recargar los datos al volver a la pantalla
  useFocusEffect(
    React.useCallback(() => {
      fetchRiegos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riegos</Text>

      {/* Barra de búsqueda personalizada */}
      <SearchBar
        placeholder="Buscar por cultivo"
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {/* Lista de riegos */}
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

      {/* Botón para registrar un nuevo riego */}
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