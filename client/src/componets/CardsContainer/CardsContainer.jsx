import React, { useState } from "react";
import styles from "./CardsContainer.module.css";
import { Card } from "../";

import SearchBar from "../SearchBar/SearchBar";

const CardsContainer = ({ games }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(15);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = games.slice(indexOfFirstElement, indexOfLastElement);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(games.length / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.todo}>
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
