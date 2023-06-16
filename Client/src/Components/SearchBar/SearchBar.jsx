import style from "./SearchBar.module.css";
import { useState } from "react";
import { searchByName } from "../../Redux/actions"
import { useDispatch } from "react-redux";

const SearchBar = () => {
    const [gameName, setGameName] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setGameName(event.target.value)
    }

    const handleKeypress = (event) => {
      if (event.keyCode === 13) {
        dispatch(searchByName(gameName))
        setGameName("")
      }
    };


    return(
        <div style={{backgroundColor: "black"}}>
            <input 
                className={style.barraSearch}
                placeholder="Search a game..."
                type="text" 
                onChange={handleChange}
                value={gameName}
                autoComplete="off"
                onKeyUp={handleKeypress}
            />
            <button
                className={style.botonSearch}
                onClick={() => {dispatch(searchByName(gameName)); setGameName("")}}
            >🔍︎</button>
        </div>
    )
};

export default SearchBar;