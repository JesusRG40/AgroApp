export default class RiegoModel {
    constructor(id, cantAgua, duracionRiego, metodoRiego) {
      this.id = id;
      this.cantAgua = cantAgua;
      this.duracionRiego = duracionRiego;
      this.metodoRiego = metodoRiego;
    }
  
    static fromFirestore(doc) {
      return new RiegoModel(
        doc.id,
        doc.data().cantAgua,
        doc.data().duracionRiego,
        doc.data().metodoRiego
      );
    }
}  