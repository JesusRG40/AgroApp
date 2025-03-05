import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CultivosList from './View/CultivosList';
import RegistrarCultivo from './View/RegistrarCultivo';
import LoginScreen from './View/LoginScreen';
import HomeScreen from './View/HomeScreen';
import DetailScreen from './View/DetailScreen';
import EditCultivoScreen from './View/EditCultivo'
import RiegosList from './View/RiegosList';
import RiegoDetail from './View/RiegoDetail';
import RegistrarRiego from './View/RegistrarRiegoScreen';
import EditRiego from './View/EditRiegoScreen';
import InsumosList from './View/InsumosList';
import RegistrarInsumo from './View/RegistrarInsumoScreen';
import InsumoDetail from './View/InsumosDetail';
import EditInsumo from './View/EditInsumos';
import HistorialList from './View/HistorialList';
import HistorialDetail from './View/HistorialDetail';
import RegistrarHistorial from './View/RegistrarHistorial';
import EditHistorial from './View/EditHistorial';
import CostosList from './View/CostosList';
import CostoDetail from './View/CostoDetail';
import RegistrarCosto from './View/RegistrarCosto';
import EditCosto from './View/EditCosto';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="CultivosList" component={CultivosList} options={{ title: 'Lista de Cultivos' }} />
      <Stack.Screen name="RegistrarCultivo" component={RegistrarCultivo} options={{ title: 'Registrar Cultivo' }} />
      <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Detalle del Cultivo' }} />
      <Stack.Screen name="EditCultivo" component={EditCultivoScreen} options={{ title: 'Editar Cultivo' }} />
      <Stack.Screen name="RiegosList" component={RiegosList} options={{ title: 'Lista de Riegos' }} />
      <Stack.Screen name="RiegoDetail" component={RiegoDetail} options={{ title: 'Detalles del riego' }} />
      <Stack.Screen name="RegistrarRiego" component={RegistrarRiego} options={{ title: 'Registrar Riego' }} />
      <Stack.Screen name="EditRiego" component={EditRiego} options={{ title: 'Editar Riego' }} />
      <Stack.Screen name="InsumosList" component={InsumosList} options={{ title: 'Lista de Insumos' }} />
      <Stack.Screen name="RegistrarInsumo" component={RegistrarInsumo} options={{ title: 'Registrar Insumo' }} />
      <Stack.Screen name="InsumoDetail" component={InsumoDetail} options={{ title: 'Detalles del insumo' }} />
      <Stack.Screen name="EditInsumo" component={EditInsumo} options={{ title: 'Editar insumo' }} />
      <Stack.Screen name="HistorialList" component={HistorialList} options={{ title: 'Lista de historiales de suelo' }} />
      <Stack.Screen name="HistorialDetail" component={HistorialDetail} options={{ title: 'Detalles del historial del suelo' }} />
      <Stack.Screen name="RegistrarHistorial" component={RegistrarHistorial} options={{ title: 'Registrar Historial' }} />
      <Stack.Screen name="EditHistorial" component={EditHistorial} options={{ title: 'Editar Historial' }} />
      <Stack.Screen name="CostosList" component={CostosList} options={{ title: 'Lista de Costos' }} />
      <Stack.Screen name="CostoDetail" component={CostoDetail} options={{ title: 'Detalles del costo' }} />
      <Stack.Screen name="RegistrarCosto" component={RegistrarCosto} options={{ title: 'Registrar Costo' }} />
      <Stack.Screen name="EditCosto" component={EditCosto} options={{ title: 'Editar Costo' }} />
    </Stack.Navigator>
  );
}