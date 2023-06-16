import style from "./DetailPage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
    const { id } = useParams();
    const [videogame, setVideogame] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/videogames/${id}`).then(({ data }) => {
            if(data.name){
                setVideogame(data);
            } else {
                window.alert("No game has that ID.")
            }
        });
        return setVideogame({});
    }, [id]);

    return (
        <div style={{color: "white"}}>
            <h1>TENES QUE HACER EL DETAIL CHE CULIAU</h1>
            <h2>Pero el juego que tocaste es {videogame.name && videogame.name}</h2>
        </div>
    )
};

export default DetailPage;