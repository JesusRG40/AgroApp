import { useState } from "react";
import { logout } from "../Model/HomeModel";
import { Alert, Animated } from "react-native";

export const useHomeController = (navigation) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleToggleMenu = () => {
    if (menuVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      Alert.alert("Éxito", "Sesión cerrada correctamente");
      navigation.replace("Login");
    } else {
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    }
  };

  return {
    menuVisible,
    fadeAnim,
    handleToggleMenu,
    handleLogout,
  };
};