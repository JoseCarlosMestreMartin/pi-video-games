import {
  GET_ALLGAMES,
  FILTER_GENRES,
  FILTER_ORIGIN,
  ORDER,
  ALPHABETH,
  GET_VIDEOGAME_BY_NAME,
  GET_ALL_GENRES,
  FILTER,
  SET_FILTER,
  SET_ORDER,
} from "./index";
import axios from "axios";

const URL = "/videogames/";
export const filterCard = (payload) => {
  console.log("dentro del filterCard de action");
  return { type: FILTER, payload };
};
export const setFilter = (payload) => {
  return { type: SET_FILTER, payload };
};
export const setOrder = (payload) => {
  return { type: SET_ORDER, payload };
};

export const orderByRating = (payload) => {
  return { type: ORDER, payload };
};

export const alphabetically = (payload) => {
  return { type: ALPHABETH, payload };
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
