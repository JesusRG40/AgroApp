import { loginUser, registerUser } from "../Model/AuthModel";
import { Alert } from "react-native";

export const handleLogin = async (email, password, navigation, setLoading) => {
  setLoading(true);
  try {
    const userCredential = await loginUser(email, password);
    console.log("Inicio de sesión exitoso:", userCredential.user);
    Alert.alert("Éxito", "Inicio de sesión exitoso");
    navigation.replace("Home");
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "No se pudo iniciar sesión. Revisa tus credenciales.");
  } finally {
    setLoading(false);
  }
};

export const handleSignUp = async (email, password, setLoading) => {
  setLoading(true);
  try {
    const userCredential = await registerUser(email, password);
    console.log("Registro exitoso:", userCredential.user);
    Alert.alert("Éxito", "Usuario registrado correctamente");
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "No se pudo registrar el usuario.");
  } finally {
    setLoading(false);
  }
};