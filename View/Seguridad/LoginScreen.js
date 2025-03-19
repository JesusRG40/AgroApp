import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from "react-native";
import { handleLogin, handleSignUp } from "../../Presenter/AuthPresenter";

const { width, height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
      <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
      <View style={[styles.circle, styles.circle4]} />

      <View style={styles.content}>
        <Text style={styles.logoText}>AgroApp</Text>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput style={styles.input} placeholder="Correo Electrónico" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password, navigation, setLoading)}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          ¿No tienes cuenta? <Text style={styles.linkText} onPress={() => handleSignUp(email, password, setLoading)}>Registrarse</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  circle: { position: "absolute", borderRadius: 9999, opacity: 0.3 },
  circle1: { width: width * 0.7, height: width * 0.7, backgroundColor: "#FF6B6B", top: -width * 0.35, left: -width * 0.35 },
  circle2: { width: width * 0.5, height: width * 0.5, backgroundColor: "#6BCB77", bottom: -width * 0.25, right: -width * 0.25 },
  circle3: { width: width * 0.6, height: width * 0.6, backgroundColor: "#4D96FF", top: height * 0.2, right: -width * 0.3 },
  circle4: { width: width * 0.4, height: width * 0.4, backgroundColor: "#FFD93D", bottom: height * 0.3, left: -width * 0.2 },
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  logoText: { fontSize: 32, fontWeight: "bold", color: "#4CAF50", marginBottom: 10 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: "#fff" },
  button: { width: "100%", height: 50, backgroundColor: "#4CAF50", justifyContent: "center", alignItems: "center", borderRadius: 8, marginBottom: 15 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  footerText: { fontSize: 16, color: "#333" },
  linkText: { color: "#4CAF50", fontWeight: "bold" },
});