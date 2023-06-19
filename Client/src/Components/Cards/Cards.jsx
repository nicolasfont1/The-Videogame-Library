import style from "./Cards.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const Cards = ({globalVideogames}) => {
   const pageLoading = useSelector((state) => state.pageLoading);

    return(
        <div className={style.containerDiv}>
            {
                globalVideogames?.map((game) => {
                    return <Card
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        image={game.image}
                        genres={game.genres.map((genre) => genre.name + " ")}
                    />
                })
            }
        </div>
    )
};

export default Cards;