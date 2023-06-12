import style from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = () => {
    const [gameName, setGameName] = useState("");

    const handleChange = (event) => {
        setGameName(event.target.value)
    }

    return(
        <div>
            <input className={style.barraSearch} placeholder="Search a game..." type="text" onChange={handleChange} value={gameName}/>
            <button className={style.botonSearch} onClick={() => {setGameName("")}}>🔍︎</button>
        </div>
    )
};

export default SearchBar;