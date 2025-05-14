// screens/RegistrarUsuarioScreen.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { handleRegistrarUsuario } from '../../Presenter/UsuariosPresenter';

const ROLES = [
  'Administrador',
  'Agricultor',
  'Supervisor',
  'Tecnico de suelo',
];

export default function RegistrarUsuarioScreen({ navigation, route }) {
  const refresh = route.params?.refresh;

  const [usuario, setUsuario] = useState({
    nombre: '',
    telefono: '',
    estatus: true,
    password: '',
    email: '',
    rol: '',
  });

  const handleChange = (key, value) => {
    setUsuario(prev => ({ ...prev, [key]: value }));
  };

  const validarDatos = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!usuario.nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio.');
      return false;
    }
    if (!usuario.telefono.trim()) {
      Alert.alert('Error', 'El teléfono es obligatorio.');
      return false;
    }
    if (!emailRegex.test(usuario.email)) {
      Alert.alert('Error', 'El email no tiene un formato válido.');
      return false;
    }
    if (!usuario.password.trim()) {
      Alert.alert('Error', 'La contraseña es obligatoria.');
      return false;
    }
    if (!usuario.rol || !ROLES.includes(usuario.rol)) {
      Alert.alert(
        'Error',
        'El rol debe ser uno de: Administrador, Agricultor, Supervisor, Tecnico de suelo.'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validarDatos()) return;
    handleRegistrarUsuario(usuario, navigation, refresh);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={usuario.nombre}
        onChangeText={v => handleChange('nombre', v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={usuario.telefono}
        onChangeText={v => handleChange('telefono', v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={usuario.email}
        onChangeText={v => handleChange('email', v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={usuario.password}
        onChangeText={v => handleChange('password', v)}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Rol:</Text>
        <Picker
          selectedValue={usuario.rol}
          onValueChange={v => handleChange('rol', v)}
          style={styles.picker}
        >
          <Picker.Item label="-- Seleccione rol --" value="" />
          {ROLES.map(role => (
            <Picker.Item key={role} label={role} value={role} />
          ))}
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Estatus:</Text>
        <Switch
          value={usuario.estatus}
          onValueChange={value => handleChange('estatus', value)}
        />
      </View>

      <Button title="Registrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pickerLabel: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#555',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#555',
  },
});