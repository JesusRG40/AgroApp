import { obtenerInsumos } from "../Model/InsumosModel";

export const fetchInsumos = async (setInsumos, setFilteredInsumos) => {
  try {
    const insumosData = await obtenerInsumos();
    setInsumos(insumosData);
    setFilteredInsumos(insumosData);
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "No se pudo cargar la lista de insumos.");
  }
};

export const filtrarInsumos = (text, insumos, setSearchTerm, setFilteredInsumos) => {
  setSearchTerm(text);
  if (text === "") {
    setFilteredInsumos(insumos);
  } else {
    const filtered = insumos.filter((insumo) =>
      insumo.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredInsumos(filtered);
  }
};