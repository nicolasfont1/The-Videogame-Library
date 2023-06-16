import style from "./HomePage.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import { pageIsLoading } from "../../Redux/actions"
import { useEffect } from "react";

const HomePage = () => {
    const globalVideogames = useSelector((state) => state.globalVideogames);
    const pageLoading = useSelector((state) => state.pageLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        if(globalVideogames.length)dispatch(pageIsLoading(false))
    }, [globalVideogames.length])

    return (
        <div className={style.homepageDiv}>
            {pageLoading && <span className={style.loader}></span>}
            <div className={style.communityDiv} style={pageLoading ? {opacity: "0.3"} : {opacity: "1"}}>
                <div className={style.wordsDiv}>
                    <h1 style={{fontSize: "70px", margin: "0px"}}>YOU</h1>
                    <h1 style={{fontSize: "50px", margin: "0px"}}>CAN BE PART</h1>
                    <h1 style={{fontSize: "60px", margin: "0px"}}>OF THE COMMUNITY</h1>
                </div>
                <button className={style.addButton}>ADD GAME</button>
                <div className={style.informationDiv}>
                </div>
            </div>
            <SearchBar />
            <Cards globalVideogames={globalVideogames} />
        </div>
    )
}

export default HomePage;