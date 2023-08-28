import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { CardsContainer } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getAllGenres } from "../../../redux/actions";


const Home = () => {
  const dispatch = useDispatch();
  const {filterVideogames: games} = useSelector(state => state)

  useEffect(() => {
    !games.length && dispatch(getGames());
    dispatch(getAllGenres());
  }, [dispatch, games]);

  return (
    <div>
      <CardsContainer games={games}/>
      <Link to="/" className={styles.navLink}>BACK</Link>
    </div>
  );
};

export default Home;
