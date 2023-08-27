const axios = require(`axios`);
const { Videogame, Genre } = require(`../db`);
const { validate } = require(`uuid`);
require(`dotenv`).config();
const { APIKEY, URL_MOCK } = process.env;


const getVideogamesById = async (id) => {
  try {
    if (validate(id)) {
      const dbVideogame = await searchOnDb(id)
      if (dbVideogame) return dbVideogame
      throw Error('Videogame not found')
    } else if (Number(id)) {
      const apiVideogame = await searchOnApi(id)
      if (apiVideogame) return apiVideogame
      throw Error('Videogame not found')
    } else {
      throw Error('Videogame not found')
    }
  } catch (error) {
    throw Error(error.message)
  }
}

const searchOnApi = async (id) => {
    try {
        let apiVideogame;
        const { data } = await axios(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`);
          
            if (!data.name.length) throw Error('Videogame not found');
            apiVideogame = {
              id: data.id,
              name: data.name,
              description: data.description_raw,
              platforms: data.platforms.map(r => r.platform.name),
              image: data.background_image ? data.background_image : 'https://sm.ign.com/ign_es/screenshot/default/60225-metal-gear-solid-3-subsistence-playstation-2_umwf.jpg',
              released: data.released,
              rating: data.rating_top,
              genres: data.genres.map(genre => genre.name)
            };
          
        return apiVideogame;  
    } catch (error) {
        throw Error(error.message)
    }
    
  };

const searchOnDb = async (id) => {
  try {
    const auxVideogame = await Videogame.findByPk(id, {
      include: Genre
    })
    const dbVideogame = {
      id: auxVideogame.id,
      name: auxVideogame.name,
      description: auxVideogame.description,
      platforms: auxVideogame.platforms,
      imag: auxVideogame.imag,
      released: auxVideogame.released,
      rating: auxVideogame.rating,
      genres: auxVideogame.genres.map(genre => genre.name),
    }
    return dbVideogame
    
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = getVideogamesById;



