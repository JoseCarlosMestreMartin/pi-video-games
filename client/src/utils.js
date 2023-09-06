//lista las distintas clacificaciones contenidas en la propiedad indicada dentro de los elementos del array pasado
export function obtenerClasificaciones(array, propiedad) {
  let clasificaciones = ["All"];

  Array && Array.isArray(array) && array.forEach((objeto) => {
    if (objeto[propiedad] && Array.isArray(objeto[propiedad])) {
      objeto[propiedad].forEach((clasificacion) => {
        if (!clasificaciones.includes(clasificacion)) {
          clasificaciones.push(clasificacion);
        }
      });
    }
    ///
    if (objeto[propiedad] && !Array.isArray(objeto[propiedad])) {
      if (!clasificaciones.includes(objeto[propiedad])) {
        clasificaciones.push(objeto[propiedad]);
      }
    }
    ///
  });
  if(clasificaciones.length>0) clasificaciones.sort();

  return clasificaciones;
}
