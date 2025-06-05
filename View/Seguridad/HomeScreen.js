// screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { useHomeController } from "../../Presenter/HomePresenter";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation, route }) {
  // Extraemos el rol desde route.params (debe venir desde el login)
  const { rol } = route.params || {};

  const { menuVisible, fadeAnim, handleToggleMenu, handleLogout } =
    useHomeController(navigation);

  // Función de ayuda: verifica si el rol actual tiene acceso a cierta sección
  const canAccess = (seccion) => {
    switch (rol) {
      case "Administrador":
      case "Supervisor":
        // Ambos ven todos los botones
        return true;
      case "Agricultor":
        return seccion === "Cultivos" || seccion === "Riegos";
      case "Tecnico de suelo":
        return seccion === "Historial Suelo";
      default:
        return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      <View style={styles.content}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>¡Bienvenido a AgroApp!</Text>
        <Text style={styles.subtitle}>Rol: {rol}</Text>

        <TouchableOpacity style={styles.centralButton} onPress={handleToggleMenu}>
          <Text style={styles.centralButtonText}>
            {menuVisible ? "Cerrar Menú" : "Abrir Menú"}
          </Text>
        </TouchableOpacity>

        {menuVisible && (
          <Animated.View style={[styles.menuWrapper, { opacity: fadeAnim }]}>
            <ScrollView contentContainerStyle={styles.menuContainer}>
              {canAccess("Cultivos") && (
                <TouchableOpacity
                  style={[styles.button, styles.cultivosButton]}
                  onPress={() => navigation.navigate("CultivosList")}
                >
                  <Text style={styles.buttonText}>Cultivos</Text>
                </TouchableOpacity>
              )}

              {canAccess("Riegos") && (
                <TouchableOpacity
                  style={[styles.button, styles.riegosButton]}
                  onPress={() => navigation.navigate("RiegosList")}
                >
                  <Text style={styles.buttonText}>Riegos</Text>
                </TouchableOpacity>
              )}

              {canAccess("Historial Suelo") && (
                <TouchableOpacity
                  style={[styles.button, styles.historialSueloButton]}
                  onPress={() => navigation.navigate("HistorialList")}
                >
                  <Text style={styles.buttonText}>Historial Suelo</Text>
                </TouchableOpacity>
              )}

              {canAccess("Costos") && (
                <TouchableOpacity
                  style={[styles.button, styles.costosButton]}
                  onPress={() => navigation.navigate("CostosList")}
                >
                  <Text style={styles.buttonText}>Costos</Text>
                </TouchableOpacity>
              )}

              {canAccess("Insumos") && (
                <TouchableOpacity
                  style={[styles.button, styles.insumosButton]}
                  onPress={() => navigation.navigate("InsumosList")}
                >
                  <Text style={styles.buttonText}>Insumos</Text>
                </TouchableOpacity>
              )}

              {canAccess("Usuarios") && (
                <TouchableOpacity
                  style={[styles.button, styles.usuariosButton]}
                  onPress={() => navigation.navigate("UsuariosList")}
                >
                  <Text style={styles.buttonText}>Usuarios</Text>
                </TouchableOpacity>
              )}

              {/* El botón de cerrar sesión siempre se muestra */}
              <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  circle: {
    position: "absolute",
    borderRadius: 9999,
    opacity: 0.3,
  },
  circle1: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: "#FFD93D",
    top: -width * 0.4,
    left: -width * 0.35,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: "#4CAF50",
    bottom: -width * 0.3,
    right: -width * 0.3,
  },
  circle3: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: "#4D96FF",
    top: height * 0.2,
    right: -width * 0.4,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  centralButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 5,
  },
  centralButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  menuWrapper: {
    marginTop: 20,
    maxHeight: height * 0.6,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
  button: {
    width: "45%",
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  cultivosButton: {
    backgroundColor: "#4CAF50",
  },
  riegosButton: {
    backgroundColor: "#2196F3",
  },
  historialSueloButton: {
    backgroundColor: "#9C27B0",
  },
  costosButton: {
    backgroundColor: "#E91E63",
  },
  insumosButton: {
    backgroundColor: "#FF9800",
  },
  usuariosButton: {
    backgroundColor: "#3F51B5",
  },
  logoutButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});