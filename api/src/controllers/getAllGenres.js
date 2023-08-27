const { Genre } = require(`../db`)
const axios = require(`axios`) 
const { APIKEY } = process.env

const getAllGenres = async () => {
  try {
    const dbGenres = await Genre.findAll()

    if (!dbGenres.length) {
      
      const { data } = await axios(`https://api.rawg.io/api/genres?key=${APIKEY}`)
      const { results } = data;
      if (!results) throw Error("API request error")
      let genres = results.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      });
      await Genre.bulkCreate(genres)
      return genres
    }

    return dbGenres.map((genre) => {
      return {
        id: genre.id,
        name: genre.name,
      }
    })
  } catch (error) {
    throw Error(error.message)
  }
};

module.exports = getAllGenres
