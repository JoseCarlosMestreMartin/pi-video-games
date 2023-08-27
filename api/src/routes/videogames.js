const videogamesRouter = require("express").Router();

const getAllVideogames = require(`../controllers/getAllVideogames`);
const getVideogamesById = require(`../controllers/getVideogameById`);
const getVideogamesByName = require(`../controllers/getVideogamesByName`);
const createVideogame = require(`../controllers/createVideogame`);

videogamesRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const VideogamesByName = await getVideogamesByName(name);
      res.status(200).json(VideogamesByName);
    } else {
      let AllVideogames = await getAllVideogames();
      res.status(200).json(AllVideogames);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

videogamesRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const videogame = await getVideogamesById(id);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


videogamesRouter.post(`/`, async (req, res) => {
  const newVideogame = req.body;
  try {
    console.log("antes de create videogame: ",req.body);
    let auxVideogame = await createVideogame(newVideogame);
    console.log("creo videogames",auxVideogame);
    // const { id, name, imag, rating, description, genres } = await getVideogamesById(
    //   auxVideogame.videogame.id
    // );
    res.status(200).json({
      response: "creaaaado",
      // response: auxVideogame.created
      //   ? {
      //       message: `Videogame created successfully!`,
      //       createdVideogame: { id, name, imag, rating, description, genres },
      //     }
      //   : { message: `Videogame exists` },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = videogamesRouter;
