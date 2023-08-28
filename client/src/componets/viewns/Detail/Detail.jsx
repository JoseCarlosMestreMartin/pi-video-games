import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";


const st = { width: "500px", height: "500px", borderRadius: "80%" };

const Detail = () => {
  const { id } = useParams();
  const [videoGame, setVideoGame] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const axiosData = async () => {
      try {
        const { data } = await axios(`http://localhost:3001/videogames/${id}`);
        data.name ? setVideoGame(data) : window.alert("No hay personajes con ese ID");
      } catch (error) {
        console.error(error);
      }
    };
    axiosData();
    return setVideoGame({});
  }, [id]);

  const { name, imag, rating, platforms, released, description, genres } = videoGame;

  return (
    <div className={styles.container}>
      <img src={imag || videoGame.image} style={st} />
      <h1>► ID | {videoGame.id}</h1>
      <h1>► NAME | {name}</h1>
      <h1>► RATING | {rating}</h1>
      <h1>► RELEASED | {released}</h1>
      <h1>
        ► PLATFORMS |{" "}
        {platforms?.map((plat) => (
          <div>{plat}</div>
        ))}
      </h1>
      <h1>
        ► GENRES |{" "}
        {genres?.map((gen) => (
          <div>{gen}</div>
        ))}
      </h1>
      <h1>► DESCRIPTION | {description}</h1>
    </div>
  );
};

export default Detail;
