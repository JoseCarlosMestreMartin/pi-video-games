const { Videogame, Genre } = require(`../db`);
const axios = require(`axios`);
const { Op } = require(`sequelize`);
const { APIKEY } = process.env;

const getVideogamesByName = async (name) => {
  try {
    const dbVideogames = await getDbVideogamesByName(name);
    const apiVideogames = await getApiVideogamesByName(name);
    if ([...dbVideogames, ...apiVideogames].length === 0)
      throw Error(`No matches found`);
    return [...dbVideogames, ...apiVideogames].slice(0, 15);
  } catch (error) {
    throw Error(error.message);
  }
};

const getDbVideogamesByName = async (name) => {
  try {
    const auxVideogames = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: Genre,
    });
    const dbVideogames = auxVideogames.map((vg) => {
      return {
        id: vg.id,
        name: vg.name,
        imag: vg.imag,
        rating: vg.rating,
        genres: vg.genres.map(({ name }) => name),
      };
    });

    return dbVideogames;
  } catch (error) {
    throw Error(error.message);
  }
};

const getApiVideogamesByName = async (name) => {
  try {
    const { data } = await axios(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`);
    const api = data.results;
    const apiVideogames = api.map((game) => {
      return {
        id: game.id,
        name: game.name,
        imag: game.background_image,
        rating: game.rating_top,
        genres: game.genres.map(({ name }) => name),
      };
    });
    return apiVideogames;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = getVideogamesByName;
