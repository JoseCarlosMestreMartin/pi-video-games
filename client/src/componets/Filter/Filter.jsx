import React from "react";
import styles from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, filterCard } from "../../redux/actions";
import { obtenerClasificaciones } from "../../utils";
const Filter = ({ item }) => {
  const dispatch = useDispatch();
  const { genres: listGenres, videogames } = useSelector((state) => state);
  const listOf = obtenerClasificaciones(videogames, item.nombre);
  
  const handlerFilter = (identifier, option) => {
    console.log('Identifier:', identifier);
    console.log('Selected option:', option);
    //aqui debe setear el filtro y ejecutar el filtrado
    dispatch(setFilter({propiety: identifier, selection: option}));
    dispatch(filterCard());

  };
  console.log("item: ", item);
  return (
    <div className={styles.module}>
      <span>{item.nombre}</span>
      <select onChange={(e) => handlerFilter(item.nombre, e.target.value)}>
        {listOf &&
          listOf.map((op) => {
            return (
              <option
                key={item.nombre}
                value={op}
              >
                {op}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Filter;
