import { filtrarTarjetasPorPropiedad, ordenarCards } from "../utils";
import {
  GET_ALLGAMES,
  ORDER,
  ALPHABETH,
  GET_VIDEOGAME_BY_NAME,
  GET_ALL_GENRES,
  SET_FILTER,
  RESET_FILTER,
  FILTER,
  SET_ORDER,
} from "./index";

const initialState = {
  videogames: [],
  filterVideogames: [],
  orderVideogames: [],
  genres: [],
  cardFilter: [
    { property: "genres", selection: "All" },
    { property: "Created", selection: "All" },
  ],
  nameToSearch: "",
  cardOrder: [{ property: "name", isAscending: true }],
  typeOfOrderIsAtoZ: true,
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
      console.log("state.cardOrder4: ", state.cardOrder);
      let auxFilter = state.cardFilter.map((e) => {
        let eAux = e;
        if (e.property === payload.property) {
          eAux.selection = payload.selection;
        }
        return eAux;
      });
      console.log("state.cardOrder3: ", state.cardOrder);
      return { ...state, cardFilter: auxFilter };

    case SET_ORDER: ////////////////////////////////////////////////
    console.log("state.filterVideogames: ",state.filterVideogames);
    console.log("state.cardOrder: ", state.cardOrder);
      let auxOrder = state.cardOrder.slice();
      for (let i = 0; i < auxOrder.length; i++) {
        if (auxOrder[i].property === payload.property) {
          auxOrder[i].isAscendent = payload.isAscendent;
        }
      }
      //ordenar las card
      // let auxCards = ordenarCards(state.filterVideogames,);
      let auxOrderedCards = ordenarCards(state.filterVideogames,state.cardOrder[0].property,state.cardOrder[0].isAscending);
      console.log("state.cardOrder2: ", state.cardOrder);
      return { ...state, filterVideogames: auxOrderedCards, cardOrder: auxOrder };

    ///
    case FILTER:
      console.log("state.cardOrder5: ", state.cardOrder);
      let filteredCards = [];
      if (
        state.videogames &&
        state.videogames.length > 0 &&
        state.cardFilter.length > 0
      ) {
        filteredCards = filtrarTarjetasPorPropiedad(
          state.videogames,
          state.cardFilter[0].property,
          state.cardFilter[0].selection
        );
        filteredCards = filtrarTarjetasPorPropiedad(
          filteredCards,
          state.cardFilter[1].property,
          state.cardFilter[1].selection
        );
        filteredCards= ordenarCards(filteredCards,state.cardOrder[0].property,state.cardOrder[0].isAscending);
      } else {
        filteredCards = state.videogames.slice();
      }
      console.log("----------filteredCards: ", filteredCards);
      return { ...state, filterVideogames: filteredCards };

    case ORDER:
      let copy2 = state.videogames.sort((a, b) => {
        if (payload === "Mayor") {
          return b.rating - a.rating;
        } else if (payload === "Minor") {
          return a.rating - b.rating;
        } else {
          return 0;
        }
      });
      return { ...state, orderVideogames: copy2 };

    case ALPHABETH:
      let copy3 = state.videogames.sort((a, b) => {
        if (payload === "A") {
          return a.name.localeCompare(b.name);
        } else if (payload === "Z") {
          return b.name.localeCompare(a.name);
        }
      });

      return { ...state, orderVideogames: copy3 };

    default:
      return { ...state };
  }
};

export default rootReducer;
