const genresRouter = require(`express`).Router();
const getAllGenres = require(`../controllers/getAllGenres`);

genresRouter.get(`/`, async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.json( genres );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = genresRouter;
