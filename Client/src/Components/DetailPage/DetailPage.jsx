import style from "./DetailPage.module.css";
import axios from "axios";
import DeleteIcon from "../../Resources/DeleteIcon.png"
import ConfirmDelete from "./ConfirmDelete";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { pageIsLoading } from "../../Redux/actions"

const DetailPage = () => {
   const { id } = useParams(); // Obtengo el id del videogame mediante params.
   const [showConfirmDelete, setShowConfirmDelete] = useState(false)
   const [videogame, setVideogame] = useState({}); // En un estado local almaceno la respuesta de la API o la DB.

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const pageLoading = useSelector((state) => state.pageLoading);

   const goBack = () => navigate("/home")

   useEffect(() => { // Cuando el componente se monta le hago una request al endpoint que trae el detail correspondiente al id.
      axios.get(`http://localhost:3001/videogames/${id}`).then(({ data }) => { // Manejo la respuesta, que es una promesa, usando .then
         if (data.name) { // Si la respuesta fue exitosa, seteo el state videogame con su contenido y "apago" el page loader.
            setVideogame(data);
            dispatch(pageIsLoading(false))
         } else {
            window.alert("Something went wrong. Please, reload the page.")
         }
      });
      return setVideogame({}); // Cuando el componente se desmonta, seteamos en default el state videogame. 
   }, [id]);

   return (
      <div className={style.pageHolderDiv}>
         {pageLoading && <span className={style.loader}></span>}
         <div className={style.gameImageDiv} style={{ backgroundImage: `url(${videogame?.image})` }} >
            <button className={style.backArrow} onClick={goBack}>⬅</button>
            {videogame?.fromDatabase && <img className={style.deleteIcon} src={DeleteIcon} onClick={() => setShowConfirmDelete(true)} />}
         </div>

         {showConfirmDelete && <ConfirmDelete gameName={videogame?.name} setShowConfirmDelete={setShowConfirmDelete} id={videogame?.id}/>}

         <div className={style.gameInformationDiv}>
            <h1 className={style.gameName}>{videogame?.name}</h1>
            {videogame?.description && <div className={style.divDescription}>
               {videogame?.description}
            </div>}

            <div className={style.lastFourProps}>
               <div className={style.platformsDiv}>
                  {videogame?.platforms && <p className={style.availableOn}>Available on</p>}
                  {videogame?.platforms && videogame?.platforms.map((platform, index) => {
                     return (<span key={index} className={style.platformsSpan}>{platform}</span>)
                  })}
               </div>

               <div className={style.releaseDateDiv}>
                  {videogame?.releaseDate &&
                     <span>
                        <p className={style.releaseDate}>Release date</p>
                        <span className={style.date}>{videogame?.releaseDate}</span>
                     </span>}
               </div>

               <div className={style.ratingDiv}>
                  {videogame?.rating &&
                     <span>
                        <p className={style.rating}>Rating</p>
                        <span className={style.ratingNumber}>{videogame?.rating}</span>
                     </span>}
               </div>

               <div className={style.genresDiv}>
                  {videogame?.genres && <p className={style.genresTitle}>Genres</p>}
                  {videogame?.genres && videogame?.genres.map((genre, index) => {
                     return (<span key={index} className={style.genresSpan}>{genre.name}</span>)
                  })}
               </div>
            </div>
         </div>
      </div>
   )
};

export default DetailPage;