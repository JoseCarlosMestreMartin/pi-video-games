// dame un ejemplo de modulo para react. que este escrito en dos archivos, uno jsx y el otro module.css. este modulo se llama  Order. tiene vinculo al state de redux para despachar mediante hooks, una funcion orderCards. la funcion orderCards, recibe dos parametros, uno es la propiedad a observar para el proceso, y el segundo parametro de ascendente. si el parametro ascendente es true indica un ordenamiento ascendente y falso para uno descendente. El componente muestra cuatro elementos: un texto que indica "Ordenar segun: " un select con las opciones de "Name" "Rating", un texto de "Orden: ", y un select con las opciones de "Ascendente" y "descendente". el modulo order debe tener un estado interno para guardar la seleccion de la propiedad a observar, y otro estado para guardar si el ordenamiento es ascendente.
// El estado inicial es "name" y true
// Order.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Order.module.css';

// const Order = () => {
//   const dispatch = useDispatch();
//   const [property, setProperty] = useState('Name');
//   const [ascending, setAscending] = useState(true);

//   const orderCards = (property, ascending) => {
//     // Dispatch the action to order the cards in the Redux state
//     dispatch({
//       type: 'SET_ORDER',
//       payload: {
//         property,
//         ascending,
//       },
//     });
//   };

//   const handlePropertyChange = (e) => {
//     setProperty(e.target.value);
//     orderCards(property, ascending);
//   };

//   const handleOrderChange = (e) => {
//     setAscending(e.target.value === 'ascending');
//     orderCards(property, ascending);
//   };

//   return (
//     <div className={styles.orderContainer}>
//       <span>Sort by:</span>
//       <select value={property} onChange={handlePropertyChange}>
//         <option value="name">Name</option>
//         <option value="rating">Rating</option>
//       </select>
//       <span>Order:</span>
//       <select value={ascending ? 'ascending' : 'descending'} onChange={handleOrderChange}>
//         <option value="ascending">Ascending</option>
//         <option value="descending">Descending</option>
//       </select>
//     </div>
//   );
// };

const Order = () => {
  const dispatch = useDispatch();
  const [property, setProperty] = useState('Name');
  const [ascending, setAscending] = useState(true);

  const orderCards = (property, ascending) => {
    // Dispatch the action to order the cards in the Redux state
    dispatch({
      type: 'SET_ORDER',
      payload: {
        property,
        ascending,
      },
    });
  };

  const handlePropertyChange = (e) => {
    setProperty(e.target.value);
    orderCards(property, ascending);
  };

  const handleOrderChange = (e) => {
    setAscending(e.target.value === 'ascending');
    orderCards(property, ascending);
  };

  return (
    <div className={styles.orderContainer}>
      <span className={styles.text}>| Sort by:</span>
      <select value={property} onChange={handlePropertyChange}>
        <option value="name">Name</option>
        <option value="rating">Rating</option>
      </select>
      <span className={styles.text}>Order:</span>
      <select value={ascending ? 'ascending' : 'descending'} onChange={handleOrderChange}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
  );
};


export default Order;
