// screens/EditarUsuarioScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { handleActualizarUsuario } from '../../Presenter/UsuariosPresenter';

const ROLES = [
  'Administrador',
  'Agricultor',
  'Supervisor',
  'Tecnico de suelo',
];

export default function EditarUsuarioScreen({ route, navigation }) {
  const { usuario } = route.params;

  const [datos, setDatos] = useState({
    id: usuario.id,
    nombre: usuario.nombre || '',
    telefono: usuario.telefono || '',
    email: usuario.email || '',
    password: usuario.password || '',
    rol: usuario.rol || '',
    estatus: typeof usuario.estatus === 'boolean' ? usuario.estatus : true,
  });

  const handleChange = (key, value) => {
    setDatos(prev => ({ ...prev, [key]: value }));
  };

  const validarDatos = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datos.nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio.');
      return false;
    }
    if (!datos.telefono.trim()) {
      Alert.alert('Error', 'El teléfono es obligatorio.');
      return false;
    }
    if (!emailRegex.test(datos.email)) {
      Alert.alert('Error', 'El email no tiene un formato válido.');
      return false;
    }
    if (!datos.password.trim()) {
      Alert.alert('Error', 'La contraseña es obligatoria.');
      return false;
    }
    if (!ROLES.includes(datos.rol)) {
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
    handleActualizarUsuario(datos, navigation);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={datos.nombre}
          onChangeText={v => handleChange('nombre', v)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={datos.telefono}
          onChangeText={v => handleChange('telefono', v)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={datos.email}
          onChangeText={v => handleChange('email', v)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={datos.password}
          onChangeText={v => handleChange('password', v)}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Rol</Text>
        <Picker
          selectedValue={datos.rol}
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
        <Text style={styles.switchLabel}>Estatus</Text>
        <Switch
          value={datos.estatus}
          onValueChange={v => handleChange('estatus', v)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#FFFFFF',
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
    marginVertical: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});