import React, { useState } from "react";
import styles from "./CardsContainer.module.css";
import { Card } from "../";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetically,
  orderByRating,
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import { obtenerClasificaciones } from "../../utils";

const CardsContainer = ({ games }) => {
  const { genres: listGenres, videogames } = useSelector((state) => state);
  const listOfGenres = obtenerClasificaciones(videogames, "genres");

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(15);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = games.slice(indexOfFirstElement, indexOfLastElement);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(games.length / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlerOrder = (e) => {
    dispatch(orderByRating(e.target.value));
  };

  const handlerAlpha = (e) => {
    dispatch(alphabetically(e.target.value));
  };

  return (
    <div className={styles.todo}>
      <div className={styles.filtros}>
        {/* <span>GENRES</span>
        <select onChange={handlerFilter}>
          {listOfGenres.length &&
            listOfGenres.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>

        <span>ORIGIN</span>
        <select onChange={handlerOrigin}>
          <option value="YES">DB</option>
          <option value="NO">API</option>
          <option value="ALL">ALL</option>
        </select> */}

        <span>RATING</span>
        <select onChange={handlerOrder}>
          <option value="Mayor">Mayor</option>
          <option value="Minor">Minor</option>
        </select>

        <span>A - Z</span>
        <select onChange={handlerAlpha}>
          <option value="A">A</option>
          <option value="Z">Z</option>
        </select>
      </div>

      <SearchBar setCurrentPage={setCurrentPage} />

      <div className={styles.container}>
        {currentElements.length === 0 && (
          <h1>Buscando juegos, por favor espera...</h1>
        )}
        {currentElements.map(({ id, name, imag, genres }) => (
          <Card name={name} imag={imag} genres={genres} id={id} key={id} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {pageNumbers.map((number) => (
          <button
            type="button"
            key={number}
            onClick={() => paginate(number)}
            className={styles.button}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
