import style from "./FormCreateGame.module.css";
import validation from "./validation";
import FormSuccess from "../FormSuccess/FormSuccess";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanGlobalVideogames, createGame, pageIsLoading } from "../../Redux/actions"

const FormCreateGame = () => {
   const [gameData, setGameData] = useState({ // En este state voy a ir almacenando la información que el user cargue en el form.
      name: "",
      image: "",
      description: "",
      platforms: [],
      releaseDate: "",
      rating: "",
      genres: []
   })

   const [errors, setErrors] = useState({}) // State que contiene los posibles errores al llenar el form.
   const [submitted, setSubmitted] = useState(false) // State que activa el componente success al cargar el form exitosamente.

   const dispatch = useDispatch();

   const handleChange = (event) => { // Solo se puede usar con los inputs cuyo name puede ser igual a la propiedad de gameData.
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

   const handlePlatforms = (event) => { // Handler para las checkboxes y el select de las plataformas.
      if (event.target.type === "checkbox") {
         if (event.target.checked) { // EL INCLUDES DE ABAJO ESTA DE MAS
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

   const handleSubmit = async (event) => {
      event.preventDefault()
      dispatch(cleanGlobalVideogames())
      dispatch(pageIsLoading(true))
      dispatch(createGame(gameData))
      setSubmitted(true)
   }

   const trendingPlatforms = [
      "PC", "PlayStation 5", "Xbox One", "PlayStation 4", "Xbox Series S/X", "Nintendo Switch", "iOS", "Android"
   ]
   
   const platformsFilled = gameData.platforms.length !== 0;
   const genresFilled = gameData.genres.length !== 0;
   let formattedDate = `${gameData.releaseDate[8]}${gameData.releaseDate[9]}/${gameData.releaseDate[5]}${gameData.releaseDate[6]}/${gameData.releaseDate[0]}${gameData.releaseDate[1]}${gameData.releaseDate[2]}${gameData.releaseDate[3]}`;

   return (
      <div className={style.allPageContainer}>
         {submitted && <FormSuccess />}
         <div className={style.detailPreviewDiv}
            style={!errors.image && gameData.image
               ? { backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.8), rgb(0, 0, 0, 0.8)), url(${gameData.image})` }
               : { backgroundColor: "rgb(105,105,105, 0.2)" }}>

            <h6 className={style.lookLikeText} style={{ fontSize: "9px" }}>Here you are!</h6>

            <h6 className={style.lookLikeText}>This is how the detail page of your videogame will look like.</h6>

            <h1 className={style.namePreview}>{gameData.name}</h1>

            {gameData.description && <div className={style.divDescription}>
               {gameData.description}
            </div>}


            <div className={style.lastFourProps}>
               {platformsFilled &&
                  <div className={style.platformsDiv}>
                     <p className={style.availableOn}>Available on: </p>
                     {gameData.platforms.map((platform, index) => {
                        return (
                           <span key={index} className={style.platformsSpan}>{platform}</span>
                        )
                     })}
                  </div>}
               
               <div className={style.releaseDateDiv}>
                  {gameData.releaseDate && !formattedDate.includes("undefined") && <span><p className={style.releaseDate}>Release date:</p> <span className={style.date}>{formattedDate}</span></span>}
               </div>

               <div className={style.ratingDiv}>
                  {gameData.rating && !errors.rating && <span><p className={style.rating}>Rating:</p><span className={style.ratingNumber}>{gameData.rating}</span></span> }
               </div>         

               {genresFilled &&
                  <div className={style.genresDiv}>
                     <span className={style.genresTitle}>Game genres: </span>
                     {gameData.genres.map((genres, index) => {
                        return (
                           <span key={genres} className={style.genresSpan}>{genres}</span>
                        )
                     })}
                  </div>}
            </div>

         </div>

         <div className={style.formDiv}>
            <h1>You can add a new game to the library!</h1>
            <form onSubmit={handleSubmit}>
               <label htmlFor="name">Name (3 characters min): </label>
               <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Enter the game name..."
                  autoComplete="off"
                  value={gameData.name}
                  onChange={handleChange}
               />
               {errors.name ? <span className={style.errorText}>{errors.name}</span> : ""}

               <hr />

               <label htmlFor="image">Image URL: </label>
               <input
                  name="image"
                  id="image"
                  type="text"
                  placeholder="Enter the image URL.."
                  autoComplete="off"
                  value={gameData.image}
                  onChange={handleChange}
               />
               {errors.image ? <span className={style.errorText}>{errors.image}</span> : ""}

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
               {errors.description ? <span className={style.errorText}>{errors.description}</span> : ""}

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

                     <label style={{ paddingRight: "25px" }}>
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
                        {errors.platforms ? <span className={style.errorText}>{errors.platforms}</span> : ""}

                        {gameData.platforms.map((platform) => {
                           return (
                              !trendingPlatforms.includes(platform)
                                 ? <span key={platform}>
                                    <span style={{ paddingLeft: "17px" }}>{platform}</span>
                                    <button style={{marginLeft: "5px"}} onClick={() => {onClose(platform)}}>X</button>
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
               {errors.releaseDate ? <span className={style.errorText}>{errors.releaseDate}</span> : ""}

               <hr />

               <label htmlFor="rating">Rating (between 0 and 5): </label>
               <input
                  name="rating"
                  id="rating"
                  type="number"
                  value={gameData.rating}
                  onChange={handleChange}
                  step=".01"
               />
               {errors.rating ? <span className={style.errorText}>{errors.rating}</span> : ""}

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
                  {errors.genres ? <span className={style.errorText}>{errors.genres}</span> : ""}

                  {gameData.genres.map((genre) => {
                     return (
                        <span key={genre}>
                           <span style={{ paddingLeft: "15px" }}>{genre}</span> <button onClick={() => { onClose(genre) }}>X</button>
                        </span>
                     )
                  })}

               </label>

               <hr />

               <button disabled={Object.keys(errors).length !== 0 || gameData.name === ""} style={{ cursor: "pointer" }}>Upload</button>
            </form>
         </div>
      </div>
   )
};

export default FormCreateGame;