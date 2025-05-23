// screens/EditarActividadUsuario.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { handleActualizarActividadUsuario } from '../../Presenter/Actividades_UsuarioPresenter';

const { width } = Dimensions.get('window');

export default function EditarActividadUsuario({ route, navigation }) {
  const { actividad } = route.params;

  const [datos, setDatos] = useState({
    id: actividad.id,
    tipoActividad: actividad.tipoActividad || '',
    descripcionActividad: actividad.descripcionActividad || '',
    fechaActividad: actividad.fechaActividad?.toDate
      ? actividad.fechaActividad.toDate().toISOString().split('T')[0]
      : actividad.fechaActividad
        ? new Date(actividad.fechaActividad).toISOString().split('T')[0]
        : '',
    estatusActividad: actividad.estatusActividad || '',
    idUsuario: actividad.idUsuario,
    idCultivo: actividad.idCultivo,
  });

  const handleChange = (key, value) => {
    setDatos(prev => ({ ...prev, [key]: value }));
  };

  const validarDatos = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!datos.tipoActividad.trim()) {
      Alert.alert('Error', 'El tipo de actividad es obligatorio.');
      return false;
    }
    if (!datos.descripcionActividad.trim()) {
      Alert.alert('Error', 'La descripción es obligatoria.');
      return false;
    }
    if (!dateRegex.test(datos.fechaActividad)) {
      Alert.alert('Error', 'La fecha debe tener formato YYYY-MM-DD.');
      return false;
    }
    if (!datos.estatusActividad.trim()) {
      Alert.alert('Error', 'El estatus de la actividad es obligatorio.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validarDatos()) return;
    handleActualizarActividadUsuario(datos, navigation);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Actividad de Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Tipo de Actividad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Riego, Poda"
          value={datos.tipoActividad}
          onChangeText={v => handleChange('tipoActividad', v)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción de la actividad"
          value={datos.descripcionActividad}
          onChangeText={v => handleChange('descripcionActividad', v)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Fecha de Actividad</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={datos.fechaActividad}
          onChangeText={v => handleChange('fechaActividad', v)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Estatus</Text>
        <TextInput
          style={styles.input}
          placeholder="Completo, Pendiente"
          value={datos.estatusActividad}
          onChangeText={v => handleChange('estatusActividad', v)}
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
    backgroundColor: '#EFEFF4',
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});