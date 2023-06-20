import style from "./DetailPage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { pageIsLoading } from "../../Redux/actions"

const DetailPage = () => {
   const { id } = useParams(); // Obtengo el id del videogame mediante params.
   const [videogame, setVideogame] = useState({}); // En un estado local almaceno la respuesta de la API o la DB.
   
   const dispatch = useDispatch();
   const pageLoading = useSelector((state) => state.pageLoading);

   useEffect(() => { // Cuando el componente se monta le hago una request al endpoint que trae el detail correspondiente al id.
      axios.get(`http://localhost:3001/videogames/${id}`).then(({ data }) => { // Manejo la respuesta, que es una promesa, usando .then
         if (data.name) {
            setVideogame(data);
            dispatch(pageIsLoading(false))
         } else {
            window.alert("Something went wrong. Please, reload the page.")
         }
      });
      return setVideogame({}); // Cuando el componente se desmonta, seteamos en default el state videogame. 
   }, [id]);

   return (
      <div style={pageLoading ? { opacity: "0.3" } : { opacity: "1" }}>
         {pageLoading && <span className={style.loader}></span>}
         <div className={style.pageHolderDiv}>
            <div className={style.gameImageDiv} style={{ backgroundImage: `url(${videogame?.image})` }} >
            </div>

            <div className={style.gameInformationDiv}>
               <h1 className={style.gameName}>{videogame?.name}</h1>
               <div className={style.divDescription}>
                  {videogame?.description}
               </div>

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
      </div>

   )
};

export default DetailPage;