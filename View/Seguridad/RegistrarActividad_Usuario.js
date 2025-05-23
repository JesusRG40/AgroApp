// screens/RegistrarActividadUsuario.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchCultivos } from '../../Presenter/CultivoPresenter';
import { handleRegistrarActividadUsuario } from '../../Presenter/Actividades_UsuarioPresenter';

const { width } = Dimensions.get('window');

export default function RegistrarActividadUsuario({ navigation, route }) {
  const { idUsuario: passedUsuarioId, refresh } = route.params;

  // Sólo cultiv os ahora
  const [cultivos, setCultivos] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);

  // Campos del formulario
  const [tipoActividad, setTipoActividad] = useState('');
  const [descripcionActividad, setDescripcionActividad] = useState('');
  const [fechaActividad, setFechaActividad] = useState('');
  const [estatusActividad, setEstatusActividad] = useState('');

  useEffect(() => {
    // Cargar sólo cultivos
    fetchCultivos(setCultivos);
  }, []);

  const renderCultivoItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.selectItem,
        selectedCultivo?.id === item.id && styles.selectItemSelected,
      ]}
      onPress={() => setSelectedCultivo(item)}
    >
      <Text style={styles.selectText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  const validarDatos = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!selectedCultivo) {
      Alert.alert('Error', 'Seleccione un cultivo.');
      return false;
    }
    if (!tipoActividad.trim()) {
      Alert.alert('Error', 'El tipo de actividad es obligatorio.');
      return false;
    }
    if (!descripcionActividad.trim()) {
      Alert.alert('Error', 'La descripción es obligatoria.');
      return false;
    }
    if (!dateRegex.test(fechaActividad)) {
      Alert.alert('Error', 'La fecha debe tener formato YYYY-MM-DD.');
      return false;
    }
    if (!estatusActividad.trim()) {
      Alert.alert('Error', 'El estatus de la actividad es obligatorio.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validarDatos()) return;

    handleRegistrarActividadUsuario(
      {
        tipoActividad,
        descripcionActividad,
        fechaActividad,
        estatusActividad,
        idUsuario: passedUsuarioId,        // uso directo del param
        idCultivo: selectedCultivo.id,     // sólo cultivo se selecciona
      },
      navigation,
      refresh
    );
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Actividad de Usuario</Text>

      {/* Selección de Cultivo */}
      <Text style={styles.label}>Seleccionar Cultivo:</Text>
      <FlatList
        data={cultivos}
        keyExtractor={item => item.id}
        renderItem={renderCultivoItem}
        style={styles.list}
      />

      {/* Tipo de Actividad */}
      <Text style={styles.label}>Tipo de Actividad:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Riego, Poda"
        value={tipoActividad}
        onChangeText={setTipoActividad}
      />

      {/* Descripción */}
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción de la actividad"
        value={descripcionActividad}
        onChangeText={setDescripcionActividad}
      />

      {/* Fecha de Actividad */}
      <Text style={styles.label}>Fecha (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-05-22"
        value={fechaActividad}
        onChangeText={setFechaActividad}
      />

      {/* Estatus de la Actividad */}
      <Text style={styles.label}>Estatus:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Completo, Pendiente"
        value={estatusActividad}
        onChangeText={setEstatusActividad}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Registrar Actividad</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  list: {
    maxHeight: width * 0.4,
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 5,
  },
  selectItem: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 5,
  },
  selectItemSelected: {
    backgroundColor: '#D1E7DD',
    borderColor: '#A3CFBB',
  },
  selectText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});