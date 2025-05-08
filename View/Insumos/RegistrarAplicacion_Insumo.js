// screens/RegistrarAplicacion.js
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
import { fetchInsumos } from '../../Presenter/InsumosPresenter';
import { handleRegistrarAplicacion } from '../../Presenter/Aplicaciones_InsumoPresenter';

const { width } = Dimensions.get('window');

export default function RegistrarAplicacion({ navigation, route }) {
  const { idCultivo, refresh } = route.params;

  // Lista de insumos
  const [insumos, setInsumos] = useState([]);
  const [selectedInsumo, setSelectedInsumo] = useState(null);

  // Campos del formulario
  const [cantidadAplicada, setCantidadAplicada] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [metodoAplicacion, setMetodoAplicacion] = useState('');
  const [fechaAplicacion, setFechaAplicacion] = useState('');
  const [estadoAplicacion, setEstadoAplicacion] = useState('');

  useEffect(() => {
    fetchInsumos(setInsumos);
  }, []);

  const renderInsumoItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.insumoItem,
        selectedInsumo?.id === item.id && styles.insumoSelected,
      ]}
      onPress={() => setSelectedInsumo(item)}
    >
      <Text style={styles.insumoText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  const validarDatos = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!selectedInsumo) {
      Alert.alert('Error', 'Seleccione un insumo.');
      return false;
    }
    const cant = parseFloat(cantidadAplicada);
    if (isNaN(cant) || cant <= 0) {
      Alert.alert('Error', 'La cantidad aplicada debe ser un número positivo.');
      return false;
    }
    if (!unidadMedida.trim()) {
      Alert.alert('Error', 'La unidad de medida es obligatoria.');
      return false;
    }
    if (!metodoAplicacion.trim()) {
      Alert.alert('Error', 'El método de aplicación es obligatorio.');
      return false;
    }
    if (!dateRegex.test(fechaAplicacion)) {
      Alert.alert('Error', 'La fecha debe tener formato YYYY-MM-DD.');
      return false;
    }
    if (!estadoAplicacion.trim()) {
      Alert.alert('Error', 'El estado de la aplicación es obligatorio.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validarDatos()) return;

    handleRegistrarAplicacion(
      {
        cantidadAplicada: parseFloat(cantidadAplicada),
        unidadMedida,
        metodoAplicacion,
        fechaAplicacion,
        estadoAplicacion,
        idCultivo,
        idInsumo: selectedInsumo.id,
      },
      navigation,
      refresh
    );
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Aplicación de Insumo</Text>

      <Text style={styles.label}>Seleccionar Insumo:</Text>
      <FlatList
        data={insumos}
        keyExtractor={(item) => item.id}
        renderItem={renderInsumoItem}
        style={styles.list}
      />

      <Text style={styles.label}>Cantidad Aplicada:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 2.5"
        value={cantidadAplicada}
        onChangeText={setCantidadAplicada}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Unidad de Medida:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. kg, L"
        value={unidadMedida}
        onChangeText={setUnidadMedida}
      />

      <Text style={styles.label}>Método de Aplicación:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Pulverización"
        value={metodoAplicacion}
        onChangeText={setMetodoAplicacion}
      />

      <Text style={styles.label}>Fecha de Aplicación (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-05-07"
        value={fechaAplicacion}
        onChangeText={setFechaAplicacion}
      />

      <Text style={styles.label}>Estado de Aplicación:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Completo, Pendiente"
        value={estadoAplicacion}
        onChangeText={setEstadoAplicacion}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Registrar</Text>
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
    maxHeight: 150,
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 5,
  },
  insumoItem: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 5,
  },
  insumoSelected: {
    backgroundColor: '#D1E7DD',
    borderColor: '#A3CFBB',
  },
  insumoText: {
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