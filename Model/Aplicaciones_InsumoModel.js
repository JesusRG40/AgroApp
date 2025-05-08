import { 
    collection, 
    getDocs, 
    doc, 
    deleteDoc, 
    updateDoc, 
    addDoc 
  } from 'firebase/firestore';
  import { db } from '../firebaseConfig';
  
  // Modelo de datos para la colección 'aplicaciones_insumo'
  export const obtenerAplicaciones = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'aplicaciones_insumo'));
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    } catch (error) {
      console.error('Error obteniendo aplicaciones de insumo:', error);
      throw new Error('No se pudo obtener la lista de aplicaciones de insumo.');
    }
  };
  
  export const eliminarAplicacion = async (id) => {
    try {
      await deleteDoc(doc(db, 'aplicaciones_insumo', id));
    } catch (error) {
      console.error('Error al eliminar aplicación de insumo:', error);
      throw new Error('No se pudo eliminar la aplicación de insumo.');
    }
  };
  
  export const actualizarAplicacion = async (id, datos) => {
    try {
      // 1) Normalizar fechaAplicacion si viene como string
      let fecha = datos.fechaAplicacion;
      if (typeof fecha === 'string') {
        fecha = new Date(fecha + 'T00:00:00');
      }
  
      // 2) Referencia al documento de la aplicación de insumo
      const docRef = doc(db, 'aplicaciones_insumo', id);
  
      // 3) Hacer merge: actualiza solo los campos que vienen en 'datos'
      await updateDoc(docRef, {
        ...datos,
        fechaAplicacion: fecha,
      });
    } catch (error) {
      console.error('Error al actualizar aplicación de insumo:', error);
      throw new Error('No se pudo actualizar la aplicación de insumo.');
    }
  };
  
  export const registrarAplicacion = async (aplicacion) => {
    try {
      // Convertir fechaAplicacion de string a Date sin desfases de zona horaria
      const fecha = new Date(aplicacion.fechaAplicacion + 'T00:00:00');
  
      // Crear referencias
      const cultivoRef = doc(db, 'cultivos', aplicacion.idCultivo);
      const insumoRef  = doc(db, 'insumos', aplicacion.idInsumo);
  
      await addDoc(collection(db, 'aplicaciones_insumo'), {
        cantidadAplicada: parseFloat(aplicacion.cantidadAplicada),
        unidadMedida: aplicacion.unidadMedida,
        metodoAplicacion: aplicacion.metodoAplicacion,
        fechaAplicacion: fecha,
        estadoAplicacion: aplicacion.estadoAplicacion,
        idCultivo: cultivoRef,
        idInsumo: insumoRef,
      });
    } catch (error) {
      console.error('Error al registrar aplicación de insumo:', error);
      throw new Error('No se pudo registrar la aplicación de insumo.');
    }
  };  