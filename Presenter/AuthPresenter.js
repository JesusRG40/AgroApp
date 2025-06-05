// Presenter/AuthPresenter.js
import { 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { Alert } from 'react-native';
import { db } from '../firebaseConfig';

// handleLogin: intenta autenticar contra la colección "usuarios" de Firestore
export const handleLogin = async (email, password, navigation, setLoading) => {
  if (!email || !password) {
    Alert.alert('Atención', 'Por favor ingresa correo y contraseña.');
    return;
  }

  setLoading(true);
  try {
    // 1. Definimos un query para buscar el usuario con email y password iguales a los ingresados
    const usuariosRef = collection(db, 'usuarios');
    const q = query(
      usuariosRef, 
      where('email', '==', email.trim().toLowerCase()), 
      where('password', '==', password)
    );

    // 2. Ejecutamos el query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      Alert.alert('Error', 'Correo o contraseña incorrectos.');
    } else {
      const usuarioDoc = querySnapshot.docs[0];
      const usuarioData = usuarioDoc.data();

      navigation.reset({
        index: 0,
        routes: [
          { 
            name: 'Home', 
            params: { 
              usuarioId: usuarioDoc.id,
              nombre: usuarioData.nombre,
              email: usuarioData.email,
              rol: usuarioData.rol 
            } 
          }
        ],
      });
    }
  } catch (error) {
    console.error('Error en handleLogin:', error);
    Alert.alert('Error', 'Ocurrió un problema al iniciar sesión.');
  } finally {
    setLoading(false);
  }
};

// handleSignUp: redirige a la pantalla de registro o ejecuta la lógica de signup
export const handleSignUp = (email, password, setLoading) => {
  Alert.alert('Registro', 'Aquí iría la lógica/ navegación para registrarse.');
};

export const handleRecoverPassword = async (email) => {
  if (!email) {
    Alert.alert('Atención', 'Por favor ingresa tu correo electrónico.');
    return;
  }

  try {
    // 1. Creamos el query para buscar al usuario por email
    const usuariosRef = collection(db, 'usuarios');
    const q = query(
      usuariosRef,
      where('email', '==', email.trim().toLowerCase())
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      Alert.alert('Error', 'No se encontró ninguna cuenta con ese correo.');
    } else {
      const usuarioDoc = querySnapshot.docs[0];
      const usuarioData = usuarioDoc.data();

      // Mostramos la contraseña en un Alert (de forma temporal)
      Alert.alert(
        'Contraseña Encontrada',
        `La contraseña de ${usuarioData.email} es:\n\n"${usuarioData.password}"`
      );
    }
  } catch (error) {
    console.error('Error en handleRecoverPassword:', error);
    Alert.alert('Error', 'Ocurrió un problema al recuperar la contraseña.');
  }
};