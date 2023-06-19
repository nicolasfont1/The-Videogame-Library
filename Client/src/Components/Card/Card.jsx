import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, genres, image }) => {
   return (
      <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
         <div className={style.cardDiv}>
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