import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideogameByName } from '../../redux/actions'
import styles from './SearchBar.module.css'

const SearchBar = ({setCurrentPage}) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Entrada invalida')
      return;
    }
    dispatch(getVideogameByName(name, 1))
      .then(() => {
        setName('');
        setError('');
        setCurrentPage(1)
      })
      .catch(() => {
        alert('Entrada invalida')
      });
  };


  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      <input type='text' value={name} onChange={(e) => handleInputChange(e)} />
      <button type='submit' onClick={(e) => handleSubmit(e)}> Search </button>
    </div>
  );
};

export default SearchBar;