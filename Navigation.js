import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CultivosList from './View/Cultivos/CultivosList';
import RegistrarCultivo from './View/Cultivos/RegistrarCultivo';
import LoginScreen from './View/Seguridad/LoginScreen';
import HomeScreen from './View/Seguridad/HomeScreen';
import DetailScreen from './View/Cultivos/DetailScreen';
import EditCultivoScreen from './View/Cultivos/EditCultivo'
import RiegosList from './View/Riegos/RiegosList';
import RiegoDetail from './View/Riegos/RiegoDetail';
import RegistrarRiego from './View/Riegos/RegistrarRiegoScreen';
import EditRiego from './View/Riegos/EditRiegoScreen';
import InsumosList from './View/Insumos/InsumosList';
import RegistrarInsumo from './View/Insumos/RegistrarInsumoScreen';
import InsumoDetail from './View/Insumos/InsumosDetail';
import EditInsumo from './View/Insumos/EditInsumos';
import HistorialList from './View/Historial_Suelo/HistorialList';
import HistorialDetail from './View/Historial_Suelo/HistorialDetail';
import RegistrarHistorial from './View/Historial_Suelo/RegistrarHistorial';
import EditHistorial from './View/Historial_Suelo/EditHistorial';
import CostosList from './View/Costos/CostosList';
import CostoDetail from './View/Costos/CostoDetail';
import RegistrarCosto from './View/Costos/RegistrarCosto';
import EditCosto from './View/Costos/EditCosto';
import Seguimiento_CultivoDetail from './View/Cultivos/Seguimiento_CultivoDetail';
import EditSeguimiento_Cultivo from './View/Cultivos/EditSeguimiento_Cultivo';
import RegistrarSeguimiento_Cultivo from './View/Cultivos/RegistrarSeguimiento_Cultivo';
import Aplicaciones_InsumoList from './View/Insumos/Aplicaciones_InsumoList';
import Aplicaciones_InsumoDetail from './View/Insumos/Aplicacion_InsumoDetail';
import RegistrarAplicacion from './View/Insumos/RegistrarAplicacion_Insumo';
import EditAplicacion from './View/Insumos/EditAplicacion_Insumo';
import UsuariosList from './View/Seguridad/UsuariosList'
import UsuarioDetail from './View/Seguridad/UsuariosDetail'
import RegistrarUsuario from './View/Seguridad/RegistrarUsuario';
import EditarUsuario from './View/Seguridad/EditUsuario';
import ActividadesUsuarioList from './View/Seguridad/Actividades_UsuarioList';
import ActividadUsuarioDetail from './View/Seguridad/Actividad_UsuarioDetail';
import RegistrarActividadUsuario from './View/Seguridad/RegistrarActividad_Usuario';
import EditarActividadUsuario from './View/Seguridad/EditActividad_Usuario';

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
      <Stack.Screen name="Seguimiento_CultivoDetail" component={Seguimiento_CultivoDetail} options={{ title: 'Detalles del seguimiento de cultivo' }} />
      <Stack.Screen name="EditSeguimiento_Cultivo" component={EditSeguimiento_Cultivo} options={{ title: 'Editar Seguimiento de cultivo' }} />
      <Stack.Screen name="RegistrarSeguimiento_Cultivo" component={RegistrarSeguimiento_Cultivo} options={{ title: 'Registrar seguimiento de cultivo' }} />
      <Stack.Screen name="AplicacionesList" component={Aplicaciones_InsumoList} options={{ title: 'Lista de Aplicaciones de Insumo' }} />
      <Stack.Screen name="AplicacionDetail" component={Aplicaciones_InsumoDetail} options={{ title: 'Detalles de la aplicacion de insumo' }} />
      <Stack.Screen name="EditAplicacion" component={EditAplicacion} options={{ title: 'Editar Aplicacion de Insumo' }} />
      <Stack.Screen name="RegistrarAplicacion" component={RegistrarAplicacion} options={{ title: 'Registrar aplicacion de insumo' }} />
      <Stack.Screen name="UsuariosList" component={UsuariosList} options={{ title: 'Lista de Usuarios' }} />
      <Stack.Screen name="UsuarioDetail" component={UsuarioDetail} options={{ title: 'Detalles de usuario' }} />
      <Stack.Screen name="RegistrarUsuario" component={RegistrarUsuario} options={{ title: 'Registrar usuario' }} />
      <Stack.Screen name="EditarUsuario" component={EditarUsuario} options={{ title: 'Editar usuario' }} />
      <Stack.Screen name="ActividadesUsuarioList" component={ActividadesUsuarioList} options={{ title: 'Lista de Actividades de Usuario' }} />
      <Stack.Screen name="ActividadUsuarioDetail" component={ActividadUsuarioDetail} options={{ title: 'Detalles de la actividad de usuario' }} />
      <Stack.Screen name="RegistrarActividadUsuario" component={RegistrarActividadUsuario} options={{ title: 'Registrar actividad de usuario' }} />
      <Stack.Screen name="EditarActividadUsuario" component={EditarActividadUsuario} options={{ title: 'Editar actividad de usuario' }} />
    </Stack.Navigator>
  );
}