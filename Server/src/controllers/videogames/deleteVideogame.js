const { Videogame } = require("../../db");

module.exports = async (req, res) => {
   try {
      // Hago destructuring del id que recibo por params.
      const { id } = req.params

      // Guardo en una constante el juego encontrado en la DB.
      const videogameInDB = await Videogame.findByPk(id)

      // Al juego encontrado le aplico el método de Sequelize .destroy()
      await videogameInDB.destroy()

      return res.status(200).json("Game successfully deleted.")
   } catch (error) {
      return res.status(500).json("Something went wrong...")
   }
};