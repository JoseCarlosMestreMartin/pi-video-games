//lista las distintas clacificaciones contenidas en la propiedad indicada dentro de los elementos del array pasado
export function obtenerClasificaciones(array, propiedad) {
  let clasificaciones = [];

  Array &&
    Array.isArray(array) &&
    array.forEach((objeto) => {
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
  if (clasificaciones.length > 0) clasificaciones.sort();
  clasificaciones.unshift("All");
  return clasificaciones;
}

///
export function findCards(cards, searchString) {
  if (searchString === "") {
    return cards;
  }

  return cards.filter(function (card) {
    return card.name.includes(searchString);
  });
}

export function filtrarTarjetasPorPropiedad(
  tarjetas,
  nombrePropiedad,
  valorDeseado
) {
  if (Array.isArray(valorDeseado)) {
    return tarjetas.filter((tarjeta) => {
      if (Array.isArray(tarjeta[nombrePropiedad])) {
        return tarjeta[nombrePropiedad].some((elemento) =>
          valorDeseado.includes(elemento)
        );
      } else {
        return valorDeseado.includes(tarjeta[nombrePropiedad]);
      }
    });
  } else if (valorDeseado === "All") {
    return tarjetas;
  } else {
    return (
      tarjetas.filter((tarjeta) => {
        if (Array.isArray(tarjeta[nombrePropiedad])) {
          return tarjeta[nombrePropiedad].includes(valorDeseado);
        } else {
          return tarjeta[nombrePropiedad] === valorDeseado;
        }
      })
    );
  }
}
export function filterCards(cards, theFilter) {
  //debe cumplirse card[f.property] === f.selection para  todas los the filter para que retorne esa card
  
  return cards.filter(card => {
    return theFilter.every(f => {
      return card[f.property] === f.selection;
    });
  });
}

export function sortCardsByCriteria(cardsToOrder, criteriaToOrder) {
  //cardsToOrder es un array que contiene los elementos a rodenar, según los criterios del array criteriaToFilter
  // criteriaToFilter contiene elementos que tienen la propiedad property a elegir y el criterio isAscend, que es un booleano
  return cardsToOrder.sort((a, b) => {
    for (let i = 0; i < criteriaToOrder.length; i++) {
      const criteria = criteriaToOrder[i];
      const property = criteria.property;
      const isAscend = criteria.isAscend;

      if (a[property] < b[property]) {
        return isAscend ? -1 : 1; // Sort ascending or descending
      }
      if (a[property] > b[property]) {
        return isAscend ? 1 : -1; // Sort ascending or descending
      }
    }
    return 0; // If all criteria are equal, maintain the order
  });
}
