//lista las distintas clacificaciones contenidas en la propiedad indicada dentro de los elementos del array pasado
export function obtenerClasificaciones(array, propiedad) {
  let clasificaciones = [];

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
  clasificaciones.unshift("All");
  return clasificaciones;
}


///
export function findCards(cards, searchString) {
  if (searchString === '') {
    return cards;
  }
  
  return cards.filter(function (card) {
    return card.name.includes(searchString);
  });
}

export function ordenarCards(cards, propiedad = "Name", ascendente = true) {
  return cards.sort((a, b) => {
    if (ascendente) {
      return a[propiedad] - b[propiedad];
    } else {
      return b[propiedad] - a[propiedad];
    }
  });
}

export function filtrarTarjetasPorPropiedad(tarjetas, nombrePropiedad, valorDeseado) {
  if (Array.isArray(valorDeseado)) {
    return tarjetas.filter(tarjeta => {
      if (Array.isArray(tarjeta[nombrePropiedad])) {
        return tarjeta[nombrePropiedad].some(elemento => valorDeseado.includes(elemento));
      } else {
        return valorDeseado.includes(tarjeta[nombrePropiedad]);
      }
    });
  } else if (valorDeseado === "All") {
    return ordenarCards(tarjetas);
  } else {
    return ordenarCards(tarjetas.filter(tarjeta => {
      if (Array.isArray(tarjeta[nombrePropiedad])) {
        return tarjeta[nombrePropiedad].includes(valorDeseado);
      } else {
        return tarjeta[nombrePropiedad] === valorDeseado;
      }
    }));
  }
}