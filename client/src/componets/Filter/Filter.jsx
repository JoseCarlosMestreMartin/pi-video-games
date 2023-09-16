import React from "react";
import styles from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, filterCard } from "../../redux/actions";
import { obtenerClasificaciones } from "../../utils";

const Filter = ({ item }) => {
  const dispatch = useDispatch();
  const { videogames } = useSelector((state) => state.videogames);
  const listOf = obtenerClasificaciones(videogames, item.nombre);
  
  const handlerFilter = (identifier, option) => {
    //aqui debe setear el filtro y ejecutar el filtrado
    dispatch(setFilter({property: identifier, selection: option}));
    dispatch(filterCard());
  };

  return (
    <div className={styles.container}>
      <span className={styles.text}>{item.nombre}</span>
      <select onChange={(e) => handlerFilter(item.nombre, e.target.value)}>
        {listOf &&
          listOf.map((op, index) => {
            return (
              <option key={index} value={op}>
                {op}
              </option>
            );
          })}
      </select>
    </div>
  );
};


export default Filter;
