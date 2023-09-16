import {
  GET_ALLGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_ALL_GENRES,
  FILTER,
  SET_FILTER,
  SET_ORDER,
} from "./index";
import axios from "axios";

const URL = "/videogames/";
export const filterCard = (payload) => {
  return { type: FILTER, payload };
};
export const setFilter = (payload) => {
  return { type: SET_FILTER, payload };
};
export const setOrder = (payload) => {
  return { type: SET_ORDER, payload };
};

export const getGames = () => {
  return async (dispatch) => {
    const { data } = await axios(`${URL}`);
    dispatch({ type: GET_ALLGAMES, payload: data });
  };
};

export const getVideogameByName = (name) => {
  return async function (dispatch) {
    const { data } = await axios(`${URL}?name=${name}`);
    dispatch({ type: GET_VIDEOGAME_BY_NAME, payload: data });
  };
};
export const getAllGenres = () => {
  return async (dispatch) => {
    const { data } = await axios("http://localhost:3001/genres");
    dispatch({ type: GET_ALL_GENRES, payload: data });
  };
};

// export const createCard = (card) => {
//   return (dispatch) => {
//     axios
//       .post(`/activities`, card)
//       .then((res) => {
//         alert(res.data);
//         return dispatch({
//           type: ADD_CARD,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         dispatch({
//           type: ADD_CARD,
//           payload: [],
//         });
//         alert(err.response.data);
//       });
//   };
// };