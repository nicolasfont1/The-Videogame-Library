import style from "./FormCreateGame.module.css";
import validation from "./validation";
import { useState } from "react";

const FormCreateGame = () => {
   const [gameData, setGameData] = useState({
      videogameName: "",
      image: "",
      description: "",
      platforms: [],
      releaseDate: "2024-01-01",
      rating: "0",
      genres: []
   })

   const [errors, setErrors] = useState({})

   const trendingPlatforms = [
      "PC", "PlayStation 5", "Xbox One", "PlayStation 4", "Xbox Series S/X", "Nintendo Switch", "iOS", "Android"
   ]

   const handleChange = (event) => {
      setGameData({
         ...gameData,
         [event.target.name]: event.target.value
      })

      setErrors(
         validation({
            ...gameData,
            [event.target.name]: event.target.value
         })
      )
   }

   const handlePlatforms = (event) => {
      if (event.target.type === "checkbox") {
         if (event.target.checked) {
            gameData.platforms.includes(event.target.value) ? ""
               : setGameData({
                  ...gameData,
                  platforms: [...gameData.platforms, event.target.value]
               })
         } else {
            let actualPlatforms = gameData.platforms.filter((platform) => platform !== event.target.value)
            setGameData({
               ...gameData,
               platforms: [...actualPlatforms]
            })
         }
      } else {
         if (!gameData.platforms.includes(event.target.value)) {
            setGameData({
               ...gameData,
               platforms: [...gameData.platforms, event.target.value]
            })
         }
      }

      setErrors(
         validation({
            ...gameData,
            platforms: event.target.value
         })
      )
   }

   const handleSelectGenres = (event) => {
      if (!gameData.genres.includes(event.target.value)) {
         setGameData({
            ...gameData,
            genres: [...gameData.genres, event.target.value]
         })
      }

      setErrors(
         validation({
            ...gameData,
            genres: event.target.value
         })
      )
   }

   const onClose = (name) => {
      if (gameData.platforms.includes(name)) {
         let actualPlatforms = gameData.platforms.filter((platform) => platform !== name)
         setGameData({
            ...gameData,
            platforms: [...actualPlatforms]
         })
      } else {
         let actualGenres = gameData.genres.filter((gender) => gender !== name)
         setGameData({
            ...gameData,
            genres: [...actualGenres]
         })
      }
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      console.log("Submitted")
   }

   let enableSubmit = false 

   if(!Object.keys(errors).length) enableSubmit = true

   console.log(enableSubmit)
   return (
      <div style={{ color: "white" }}>
         <h1>You can add a new game to the library!</h1>
         <form onSubmit={handleSubmit}>
            <label htmlFor="videogameName">Name (3 characters min): </label>
            <input
               name="videogameName"
               id="videogameName"
               type="text"
               placeholder="Enter the game name..."
               value={gameData.name}
               onChange={handleChange}
            />
            {errors.videogameName ? <span style={{ paddingLeft: "15px" }}>{errors.videogameName}</span> : ""}

            <hr />

            <label htmlFor="image">Image URL: </label>
            <input
               name="image"
               id="image"
               type="text"
               placeholder="Enter the image URL.."
               value={gameData.image}
               onChange={handleChange}
            />
            {errors.image ? <span style={{ paddingLeft: "15px" }}>{errors.image}</span> : ""}

            <hr />

            <label htmlFor="description">Description: </label>
            <textarea
               name="description"
               id="description"
               cols="30"
               rows="5"
               placeholder="Describe the game here..."
               value={gameData.description}
               onChange={handleChange}
            ></textarea>
            {errors.description ? <span style={{ paddingLeft: "15px" }}>{errors.description}</span> : ""}

            <hr />

            <fieldset>
               <legend>Choose the platforms</legend>
               <p>Trending platforms: </p>
               <div>
                  <label style={{ paddingRight: "15px" }}>
                     <input
                        name="platforms"
                        id="PC"
                        type="checkbox"
                        value="PC"
                        onChange={handlePlatforms}
                     />
                     PC
                  </label>

                  <label style={{ paddingRight: "15px" }}>
                     <input
                        name="platforms"
                        id="PlayStation 5"
                        type="checkbox"
                        value="PlayStation 5"
                        onChange={handlePlatforms}
                     />
                     PlayStation 5
                  </label>

                  <label style={{ paddingRight: "15px" }}>
                     <input
                        name="platforms"
                        id="Xbox One"
                        type="checkbox"
                        value="Xbox One"
                        onChange={handlePlatforms}
                     />
                     Xbox One
                  </label>

                  <label style={{ paddingRight: "15px" }}>
                     <input
                        name="platforms"
                        id="PlayStation 4"
                        type="checkbox"
                        value="PlayStation 4"
                        onChange={handlePlatforms}
                     />
                     PlayStation 4
                  </label>

                  <label style={{ paddingRight: "15px" }}>
                     <input
                        name="platforms"
                        id="Xbox Series S/X"
                        type="checkbox"
                        value="Xbox Series S/X"
                        onChange={handlePlatforms}
                     />
                     Xbox Series S/X
                  </label>

                  <label style={{ paddingRight: "15px" }}>
                     <input
                        name="platforms"
                        id="Nintendo Switch"
                        type="checkbox"
                        value="Nintendo Switch"
                        onChange={handlePlatforms}
                     />
                     Nintendo Switch
                  </label>

                  <label style={{ paddingRight: "15px" }}>
                     <input
                        name="platforms"
                        id="iOS"
                        type="checkbox"
                        value="iOS"
                        onChange={handlePlatforms}
                     />
                     iOS
                  </label>

                  <label style={{ paddingRight: "15px" }}>
                     <input
                        name="platforms"
                        id="Android"
                        type="checkbox"
                        value="Android"
                        onChange={handlePlatforms}
                     />
                     Android
                  </label>
               </div>

               <hr />

               <div>
                  <label>
                     Other:
                     <select style={{ marginLeft: "15px" }} name="Other" defaultValue="Choose" onChange={handlePlatforms}>
                        <option value="Choose" disabled>show more</option>
                        <option value="Nintendo 3DS">Nintendo 3DS</option>
                        <option value="Nintendo DS">Nintendo DS</option>
                        <option value="Xbox 360">Xbox 360</option>
                        <option value="Xbox">Xbox</option>
                        <option value="PlayStation 3">PlayStation 3</option>
                        <option value="PlayStation 2">PlayStation 2</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Wii U">Wii U</option>
                        <option value="Wii">Wii</option>
                        <option value="GameCube">GameCube</option>
                        <option value="Game Boy Advance">Game Boy Advance</option>
                        <option value="SNES">SNES</option>
                        <option value="Genesis">Genesis</option>
                     </select>
                     {errors.platforms ? <span style={{ paddingLeft: "15px" }}>{errors.platforms}</span> : ""}

                     {gameData.platforms.map((platform) => {
                        return (
                           !trendingPlatforms.includes(platform)
                              ? <span key={platform}>
                                 <span style={{ paddingLeft: "15px" }}>{platform}</span> <button onClick={() => { onClose(platform) }}>X</button>
                              </span>
                              : ""
                        )
                     })}

                  </label>
               </div>
            </fieldset>

            <hr />

            <label htmlFor="releaseDate">Release date: </label>
            <input
               name="releaseDate"
               id="releaseDate"
               type="date"
               value={gameData.releaseDate}
               onChange={handleChange}
               min="1958-10-01"
               max="2024-01-01"
               required
            />
            {errors.releaseDate ? <span style={{ paddingLeft: "15px" }}>{errors.releaseDate}</span> : ""}

            <hr />

            <label htmlFor="rating">Rating (between 1 and 5): </label>
            <input
               name="rating"
               id="rating"
               type="number"
               value={gameData.rating}
               onChange={handleChange}
               min="1"
               max="5"
            />
            {errors.rating ? <span style={{ paddingLeft: "15px" }}>{errors.rating}</span> : ""}

            <hr />

            <label>
               Add genres:
               <select style={{ marginLeft: "15px" }} name="Genres" defaultValue="Choose" onChange={handleSelectGenres}>
                  <option value="Choose" disabled>show more</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Arcade">Arcade</option>
                  <option value="Board Games">Board Games</option>
                  <option value="Card">Card</option>
                  <option value="Casual">Casual</option>
                  <option value="Educational">Educational</option>
                  <option value="Family">Family</option>
                  <option value="Fighting">Fighting</option>
                  <option value="Indie">Indie</option>
                  <option value="Massively Multiplayer">Massively Multiplayer</option>
                  <option value="Platformer">Platformer</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="RPG">RPG</option>
                  <option value="Racing">Racing</option>
                  <option value="Shooter">Shooter</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Sports">Sports</option>
                  <option value="Strategy">Strategy</option>
               </select>
               {errors.genres ? <span style={{ paddingLeft: "15px" }}>{errors.genres}</span> : ""}

               {gameData.genres.map((genre) => {
                  return (
                     <span key={genre}>
                        <span style={{ paddingLeft: "15px" }}>{genre}</span> <button onClick={() => { onClose(genre) }}>X</button>
                     </span>
                  )
               })}

            </label>

            <hr />

            <button disabled={Object.keys(errors).length !== 0}>Upload</button>

         </form>
      </div>
   )
};

export default FormCreateGame;