import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CultivosList from './screens/CultivosList';
import RegistrarCultivo from './screens/RegistrarCultivo';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/Home';
import DetailScreen from './screens/Detail';
import EditCultivoScreen from './screens/EditCultivo'
import RiegosList from './screens/RiegosList';
import RiegoDetail from './screens/RiegoDetail';
import RegistrarRiego from './screens/RegistrarRiego';
import EditRiego from './screens/EditRiego';
import InsumosList from './screens/InsumosList';
import RegistrarInsumo from './screens/RegistrarInsumo';
import InsumoDetail from './screens/InsumoDetail';
import EditInsumo from './screens/EditInsumo';

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
    </Stack.Navigator>
  );
}