import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../../redux/actions";
import { list } from "list";
import { obtenerClasificaciones } from "../../../utils";

const Form = () => {
  const dispatch = useDispatch();
  const { genres: listGenres, videogames } = useSelector((state) => state);
  const [gameData, setGameData] = useState({
    name: "",
    released: "",
    imag: "",
    rating: "",
    platforms: [],
    description: "",
    genres: [],
  });
  useEffect(() => {
    console.log("dentro del use efect");
    //dispatch(getAllGenres());
  }, []);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    const {
      released,
      rating,
      name,
      description,
      genres,
      platforms,
      imag,
    } = gameData;
    errors.imag =
      imag && !/\.(jpg|jpeg|png|gif)$/.test(imag)
        ? "Invalid image format "
        : "";
    errors.released = released.length > 8 ? "" : "released required";
    errors.rating = rating.length > 0 ? "" : "rating required";
    errors.name = name.length <= 15 ? "" : "Max 15 characters";
    errors.description = description.length <= 20 ? "" : "Max 20 characters";
    errors.genres =
      genres.length > 0 ? "" : "The game must have at least one gender";
    errors.platforms =
      platforms.length > 0 ? "" : "the game must have at least one platform";
    return errors;
  };

  useEffect(() => {
    setErrors(validate());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setErrors(validate({ ...gameData, [name]: value }));
    setGameData({ ...gameData, [name]: value });
  };

  const handlePlatformChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    //setGameData({ ...gameData, platforms: selectedOptions });
    setGameData({
      ...gameData,
      platforms: [...gameData.platforms, selectedOptions[0]],
    });
  };

  const handleGenreChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log("selectedOptions: ", selectedOptions);
    //setGameData({ ...gameData, genres: selectedOptions });
    setGameData({
      ...gameData,
      genres: [...gameData.genres, selectedOptions[0]],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("antes de enviar la info con axios");
    //console.log("gameData: ", gameData);
    axios
      .post("http://localhost:3001/videogames/", gameData)
      .then((res) => alert(`${res} Game save in DB`));
    setGameData({
      name: "",
      released: "",
      imag: "",
      rating: "",
      platforms: [],
      description: "",
      genres: [],
    });
  };
  const listOfPlatform = obtenerClasificaciones(videogames, "platforms");

  return (
    <div className={styles.container}>
      <h1>Crear Nuevo Videojuego</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={gameData.name}
            onChange={handleInputChange}
            required
          />
          <span>{errors.name && errors.name}</span>
        </div>
        <br />
        <br />

        <div>
          <label htmlFor="released">Released</label>
          <input
            type="date"
            name="released"
            value={gameData.released}
            onChange={handleInputChange}
            required
          />
          <span>{errors.released && errors.released}</span>
        </div>
        <br />
        <br />

        <label htmlFor="imag">Imag:</label>
        <input
          type="text"
          name="imag"
          value={gameData.imag}
          placeholder="https://imag.jpg"
          onChange={handleInputChange}
          required
        />
        <span>{errors.imag && errors.imag}</span>
        <br />
        <br />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={gameData.rating}
          onChange={handleInputChange}
          required
        />
        <span>{errors.rating && errors.rating}</span>
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          name="description"
          rows="4"
          cols="50"
          value={gameData.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <span>{errors.description && errors.description}</span>
        <br />
        <br />

        <label htmlFor="genres">Genres:</label>
        <select
          name="genres"
          multiple
          value={gameData.genres}
          onChange={handleGenreChange}
          required
        >
          {listGenres.length &&
            listGenres.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
        </select>
        <span>{errors.genres && errors.genres}</span>
        <br />
        <br />

        <label htmlFor="platforms">Platforms:</label>
        <select
          name="platforms"
          multiple
          value={gameData.platforms}
          onChange={handlePlatformChange}
          required
        >
          {listOfPlatform.length &&
            listOfPlatform.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
        <span>{errors.platforms && errors.platforms}</span>
        <br />
        <br />

        <button type="submit">Crear Nuevo Videojuego</button>
      </form>
    </div>
  );
};

export default Form;
