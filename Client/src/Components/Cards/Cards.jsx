// Cards es un componente smart, aunque su lógica sea pequeña, es importante para el uso de mi página web.
// Este componente recibe por props el array que contiene los juegos que quiero mostrar en pantalla y se encarga
// de mapearlo para pasarle a cada Card las propiedades de un videojuego en particular.
import style from "./Cards.module.css";
import Card from "../Card/Card";

const Cards = ({globalVideogames}) => {
    return(
        <div className={style.containerDiv}>
            { // *Observar el "?" al final de globalVideogames.
                globalVideogames?.map((game) => {
                    return <Card
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        image={game.image}
                        genres={game.genres?.map((genre) => genre.name + " ")}
                    />
                })
            }
        </div>
    )
};

export default Cards;

// *Ese signo de pregunta al final de la variable es una característica de JavaScript llamada operador de optional chaining.
// En caso de que la variable que desee renderizar sea indefinida o nula, no generará un error.
// Recordar poner optional chaining al renderizar las propiedades de los juegos en el detail.