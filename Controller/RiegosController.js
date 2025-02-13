import RiegoModel from "../Model/RiegosModel";

export default class RiegoController {
  static async obtenerRiegos(setRiegos, setFilteredRiegos) {
    const riegos = await RiegoModel.obtenerRiegos();
    setRiegos(riegos);
    setFilteredRiegos(riegos);
  }

  static filtrarRiegos(text, riegos, setFilteredRiegos) {
    if (text === "") {
      setFilteredRiegos(riegos);
    } else {
      const filtered = riegos.filter((riego) =>
        riego.cultivoNombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRiegos(filtered);
    }
  }
}