import style from "./HomePage.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getAllHomepage, pageIsLoading, getApiGenres } from "../../Redux/actions"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
   const globalVideogames = useSelector((state) => state.globalVideogames);
   const allApiGenres = useSelector((state) => state.allApiGenres)
   const pageLoading = useSelector((state) => state.pageLoading);
   const dispatch = useDispatch();

   const [currentPage, setCurrentPage] = useState(1);
   const [cardsPerPage] = useState(15);

   const lastCardIndex = currentPage * cardsPerPage;
   //         30             2       *      15
   const firstCardIndex = lastCardIndex - cardsPerPage;
   //         15                30       -    15

   const currentCards = globalVideogames?.slice(firstCardIndex, lastCardIndex);

   useEffect(() => {
      if (globalVideogames?.length) dispatch(pageIsLoading(false))
   }, [globalVideogames?.length])

   useEffect(() => {
      if (globalVideogames?.length < 1) dispatch(getAllHomepage())
      if (allApiGenres?.length < 1) dispatch(getApiGenres())
   }, [globalVideogames?.length])


   return (
      <div className={style.homepageDiv}>
         {pageLoading && <span className={style.loader}></span>}
         <div className={style.communityDiv} style={pageLoading ? { opacity: "0.3" } : { opacity: "1" }}>
            <div className={style.wordsDiv}>
               <h1 style={{ fontSize: "70px", margin: "0px" }}>YOU</h1>
               <h1 style={{ fontSize: "50px", margin: "0px" }}>CAN BE PART</h1>
               <h1 style={{ fontSize: "60px", margin: "0px" }}>OF THE COMMUNITY</h1>
            </div>
            <Link to={"/create"}>
               <button className={style.addButton}>ADD GAME</button>
            </Link>
            <div className={style.informationDiv}>
            </div>
         </div>
         <SearchBar/>
         {!pageLoading && <Pagination
            totalCards={globalVideogames?.length}
            cardsPerPage={cardsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
         />}
         <Cards globalVideogames={currentCards} />
         {!pageLoading && <Pagination
            totalCards={globalVideogames?.length}
            cardsPerPage={cardsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
         />}
      </div>
   )
}

export default HomePage;