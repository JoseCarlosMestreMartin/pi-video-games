import { GET_ALLGAMES, FILTER_GENRES, FILTER_ORIGIN, ORDER, ALPHABETH,  GET_VIDEOGAME_BY_NAME, GET_ALL_GENRES } from './index'

const initialState = {
  videogames: [], 
  filterVideogames: [],
  orderVideogames: [],
  genres: [],
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_GENRES:
      return { ...state, genres: payload}
    case GET_ALLGAMES:
      return { ...state, videogames: payload, filterVideogames: payload }

    case GET_VIDEOGAME_BY_NAME:
      return { ...state, videogames: payload, filterVideogames: payload }

    case FILTER_GENRES:
      const filterFunction = (vg) => {
        return payload.some((genre) => vg.genres.includes(genre))
      };
      let copy = state.videogames.filter(filterFunction)
      return { ...state, filterVideogames: copy }

    case FILTER_ORIGIN:
      let copy1 = payload === 'ALL'? state.videogames : state.videogames.filter((game) => {
        return game.Created === payload
      });
      return { ...state, filterVideogames: copy1 }

    case ORDER:
      let copy2 = state.videogames.sort((a, b) => {
        if (payload === 'Mayor') {
          return b.rating - a.rating
        } else if (payload === 'Minor') {
          return a.rating - b.rating
        } else {
          return 0
        }
      })
      return { ...state, orderVideogames: copy2 }

    case ALPHABETH:
      let copy3 = state.videogames.sort((a, b) => {
        if (payload === 'A') {
          return a.name.localeCompare(b.name)
        } else if (payload === 'Z') {
          return b.name.localeCompare(a.name)
        }
      });

      return { ...state, orderVideogames: copy3 }

    default:
      return { ...state }
  }
};

export default rootReducer
