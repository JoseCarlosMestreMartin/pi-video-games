const { Videogame, Genre } = require(`../db`)
const  getAllGenres = require("../controllers/getAllGenres");

const createVideogame = async (newVideogame) => {
  console.log("dentro de createVideogame");
  await getAllGenres();
  try {
    const [videogame, created] = await Videogame.findOrCreate({
      where: {
        name: newVideogame.name,
        description: newVideogame.description,
        platforms: newVideogame.platforms,
        imag: newVideogame.imag,
        released: newVideogame.released,
        rating: newVideogame.rating,
      }
    });
    //if (created) await videogame.addGenres(newVideogame.genres)
    //if(created) await videogame.addGenre(newVideogame.genres[0]);
    if(created){
      for(let i = 0; i<newVideogame.genres.length; i++)  
      await videogame.addGenre(newVideogame.genres[i]);

    }

    return { videogame, created }
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = createVideogame