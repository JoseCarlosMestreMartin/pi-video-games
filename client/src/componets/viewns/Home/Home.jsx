import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { CardsContainer } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getAllGenres } from "../../../redux/actions";
import FilterContainer from "../../FilterContainer/FilterContainer";
import Order from "../../Order/Order";

const Home = () => {
  const dispatch = useDispatch();
  //const { filterVideogames, cardFilter } = useSelector((state) => state);
  const  filterVideogames = useSelector((state) => state.filterVideogames);
  const cardFilter = useSelector((state) => state.cardFilter);

  useEffect(() => {
    !filterVideogames.length && dispatch(getGames());
    dispatch(getAllGenres());
  }, [dispatch, filterVideogames]);
  ///
  const eleccion = [
    { id: 1, nombre: "genres"},
    { id: 2, nombre: "Created"},
  ];
  ///

  return (
    <div>
      <div className={styles.container}>
      <FilterContainer data={ eleccion} />
      <Order />
      </div>
      <CardsContainer games={filterVideogames} theFilter= {cardFilter}/>
      <Link to="/" className={styles.navLink}>
        BACK
      </Link>
    </div>
  );
};

export default Home;
