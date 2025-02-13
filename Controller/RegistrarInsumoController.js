import InsumoModel from "../Model/RegistrarInsumoModel";

export default class InsumoController {
  static async registrarInsumo(data, navigation) {
    try {
      await InsumoModel.agregarInsumo(data);
      alert("Éxito", "Insumo registrado correctamente.");
      navigation.goBack();
    } catch (error) {
      alert("Error", "No se pudo registrar el insumo.");
    }
  }
}