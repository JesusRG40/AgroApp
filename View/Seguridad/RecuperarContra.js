// screens/RecuperarPasswordScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { handleRecoverPassword } from "../../Presenter/AuthPresenter";

const { width, height } = Dimensions.get("window");

export default function RecuperarPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onPressRecover = async () => {
    setLoading(true);
    await handleRecoverPassword(email);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Background decorativo igual que en LoginScreen */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
      <View style={[styles.circle, styles.circle4]} />

      <View style={styles.content}>
        <Text style={styles.logoText}>AgroApp</Text>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Recuperar Contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onPressRecover}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enviar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  circle: { position: "absolute", borderRadius: 9999, opacity: 0.3 },
  circle1: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: "#FF6B6B",
    top: -width * 0.35,
    left: -width * 0.35,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: "#6BCB77",
    bottom: -width * 0.25,
    right: -width * 0.25,
  },
  circle3: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: "#4D96FF",
    top: height * 0.2,
    right: -width * 0.3,
  },
  circle4: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: "#FFD93D",
    bottom: height * 0.3,
    left: -width * 0.2,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoText: { fontSize: 32, fontWeight: "bold", color: "#4CAF50", marginBottom: 10 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  footerText: { fontSize: 16, color: "#333" },
  linkText: { color: "#4CAF50", fontWeight: "bold" },
});