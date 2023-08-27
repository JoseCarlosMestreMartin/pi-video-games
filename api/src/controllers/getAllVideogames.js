const axios = require('axios');
require('dotenv').config();
const { Videogame, Genre } = require('../db');
const { APIKEY } = process.env;

const getAllVideogames = async () => {
  try {
    const apiVideogames = await getAllApiVideogames();
    const dbVideogames = await getAllDbVideogames();
    const allVideogames = [...dbVideogames, ...apiVideogames];
    if (!allVideogames.length) throw new Error('Videogames is empty');
    return allVideogames;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllDbVideogames = async () => {
  try {
    const videogames = await Videogame.findAll({
      include: Genre,
    });
    return videogames.map(({ id, name, released, rating, imag, Created, genres, platforms }) => ({
      id,
      name,
      released,
      rating: parseInt(rating),
      imag,
      Created,
      genres: genres?.map(({ name }) => name),
      platforms: platforms?.map((platform) => platform),
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllApiVideogames = async () => {
  try {
    const urls = [
      { name: 'page1', url: `https://api.rawg.io/api/games?key=${APIKEY}&page=10&page_size=40` },
      { name: 'page2', url: `https://api.rawg.io/api/games?key=${APIKEY}&page=20&page_size=40` },
      // { name: 'page3', url: `https://api.rawg.io/api/games?key=${APIKEY}&page=3&page_size=20` },
    ];
    const getVideogamesInfo = async ({ name, url }) => {
      const { data } = await axios.get(url);
      return { name, data: data.results };
    };
    const pendingPromises = urls.map(getVideogamesInfo);
    const allData = await Promise.allSettled(pendingPromises);
    const api = allData
      .filter(({ status }) => status === 'fulfilled')
      .flatMap(({ value }) => value.data)
      .map(({ id, name, released, rating, background_image, genres, platforms }) => ({
        id: id.toString(),
        name,
        released,
        rating: parseInt(rating),
        imag: background_image,
        Created: 'NO',
        genres: genres?.map(({ name }) => name),
        platforms: platforms?.map(({ platform }) => platform?.name),
      }));
    return api;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAllVideogames;