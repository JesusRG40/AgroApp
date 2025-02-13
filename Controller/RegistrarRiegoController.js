import RiegoModel from "../Model/RegistrarRiegoModel";

export default class RiegoController {
  static async obtenerCultivos(setCultivos) {
    try {
      const cultivos = await RiegoModel.obtenerCultivos();
      setCultivos(cultivos);
    } catch (error) {
      console.error("Error en el controlador al obtener cultivos:", error);
    }
  }

  static async registrarRiego(data, navigation) {
    try {
      await RiegoModel.agregarRiego(data);
      alert("Éxito", "Riego registrado correctamente.");
      navigation.goBack();
    } catch (error) {
      alert("Error", "No se pudo registrar el riego.");
    }
  }
}