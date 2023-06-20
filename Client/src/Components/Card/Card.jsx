import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { pageIsLoading } from "../../Redux/actions"
import { useDispatch } from "react-redux";
// Importo Link de React-Router-Dom para conectar cada Card con su detail. 

const Card = ({ id, name, genres, image }) => {
   const dispatch = useDispatch();

   const clickedCard = () => {
      dispatch(pageIsLoading(true))
   }

   // Cada Card recibe las propiedades id, name, genres e image del juego que esté mostrando.
   return (
      <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
         <div className={style.cardDiv} onClick={clickedCard}>
            <div className={style.imageDiv}>
               <img src={image} className={style.gameImage} alt="" />
            </div>
            <div className={style.gameInfoDiv}>
               <h2>{name}</h2>
               <h3>{genres}</h3>
            </div>
         </div>
      </Link>
   )
}

export default Card;