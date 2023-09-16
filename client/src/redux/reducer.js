import { filtrarTarjetasPorPropiedad, sortCardsByCriteria } from "../utils";
import {
  GET_ALLGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_ALL_GENRES,
  SET_FILTER,
  FILTER,
  SET_ORDER,
} from "./index";

const initialState = {
  videogames: [],//se guarda el total de cards
  filterVideogames: [],// se guardan las cards a visualizar luego de filtrar y ordenar
  //orderVideogames: [],
  genres: [],
  cardFilter: [
    { property: "genres", selection: "All" },
    { property: "Created", selection: "All" },
  ],
  nameToSearch: "",
  cardOrder: [{ property: "name", isAscending: true }],//propiedad y tipo de orden
  //typeOfOrderIsAtoZ: true,
  cardOptionToFilter: [], //propieties // Lista de propiedades
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_GENRES:
      return { ...state, genres: payload };
    case GET_ALLGAMES:
      return { ...state, videogames: payload, filterVideogames: payload };

    case GET_VIDEOGAME_BY_NAME:
      return { ...state, videogames: payload, filterVideogames: payload };

    case SET_FILTER:
      //console.log("state.cardOrder4: ", state.cardOrder);
      let auxFilter = state.cardFilter.map((e) => {
        let eAux = e;
        if (e.property === payload.property) {
          eAux.selection = payload.selection;
        }
        return eAux;
      });
      //console.log("state.cardOrder3: ", state.cardOrder);
      return { ...state, cardFilter: auxFilter };

    case SET_ORDER: ////////////////////////////////////////////////
      let auxCriteriaToOrder = state.cardOrder.slice();
      for (let i = 0; i < auxCriteriaToOrder.length; i++) {
        if (auxCriteriaToOrder[i].property === payload.property) {
          auxCriteriaToOrder[i].isAscending = payload.isAscending;
        }
      }
      let auxCards = state.filterVideogames.slice();
      let auxCardsOrdered = sortCardsByCriteria(auxCards, auxCriteriaToOrder);
      //console.log("state.cardOrder2: ", state.cardOrder);
      return { ...state, filterVideogames: auxCardsOrdered, cardOrder: auxCriteriaToOrder };

    ///
    case FILTER:
      //console.log("state.cardOrder5: ", state.cardOrder);
      let filteredCards = state.videogames.slice();
      if (
        state.videogames &&
        state.videogames.length > 0 &&
        state.cardFilter.length > 0
      ) {
        filteredCards = filtrarTarjetasPorPropiedad(
          filteredCards,
          state.cardFilter[0].property,
          state.cardFilter[0].selection
        );
        filteredCards = filtrarTarjetasPorPropiedad(
          filteredCards,
          state.cardFilter[1].property,
          state.cardFilter[1].selection
        );
        
      } 
      //console.log("----------filteredCards: ", filteredCards);
      return { ...state, filterVideogames: filteredCards };
   
    default:
      return { ...state };
  }
};

export default rootReducer;
