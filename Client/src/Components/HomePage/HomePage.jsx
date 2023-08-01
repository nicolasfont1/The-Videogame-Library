import style from "./HomePage.module.css";
import SearchHub from "../SearchHub/SearchHub";
import Cards from "../Cards/Cards";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getAllHomepage, pageIsLoading, getApiGenres } from "../../Redux/actions"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WhiteLinkedinLogo from "../../Resources/white-linkedin.svg"
import WhiteGithubLogo from "../../Resources/white-github.svg"

const HomePage = () => {
   let globalVideogames = useSelector((state) => state.globalVideogames); // globalVideogames contiene los juegos que estoy mostrando.
   const allApiGenres = useSelector((state) => state.allApiGenres);
   const pageLoading = useSelector((state) => state.pageLoading);
   const dispatch = useDispatch();

   const [currentPage, setCurrentPage] = useState(1); // State que setea la página actual.
   const cardsPerPage = 15; // Constante en la que guardo cuantas cards quiero mostrar por página.

   // Pequeños cálculos para obtener el primer y ultimo index de la pagina que estoy mostrando.
   const lastCardIndex = currentPage * cardsPerPage;
   //         30             2       *      15
   const firstCardIndex = lastCardIndex - cardsPerPage;
   //         15                30       -    15

   let currentCards = globalVideogames?.slice(firstCardIndex, lastCardIndex); // Divido globalVidegames segun las cards a mostrar.

   useEffect(() => { 
      if (globalVideogames?.length < 1) dispatch(getAllHomepage()) // Si aprieto F5 en homepage.
      if (globalVideogames?.length > 1) dispatch(pageIsLoading(false)) // Cuando globalVideogames tenga contenido apago el loader.
      if (allApiGenres?.length < 1) dispatch(getApiGenres()) // Si aprieto F5 en homepage.
   }, [globalVideogames?.length])

   useEffect(() => { // useEffect que por cada cambio en globalVideogames setea la currentPage en 1.
      setCurrentPage(1)
   }, [globalVideogames])

   return (
      <main className={style.homepageDiv}>
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
            <div className={style.socialMediaDiv}>
               <Link to={"https://www.linkedin.com/in/nicolasfont1/"} target="_blank">
                  <button className={style.footerSocialMediaButton}>
                     <img style={{ transform: 'translateY(1px)' }} width="45" height="45" src={WhiteLinkedinLogo} alt="linkedin--v1"/>
                  </button>
               </Link>
               <Link to={"https://github.com/nicolasfont1/"} target="_blank">
                  <button className={style.footerSocialMediaButton}>
                     <img style={{ transform: 'translateY(1px)' }} width="45" height="45" src={WhiteGithubLogo} alt="linkedin--v1"/>
                  </button>
               </Link>
            </div>
         </div>
         <SearchHub/>
         {globalVideogames.length && <Pagination
            totalCards={globalVideogames?.length}
            cardsPerPage={cardsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
         />}
         <Cards globalVideogames={currentCards} />
         {globalVideogames.length && <Pagination
            totalCards={globalVideogames?.length}
            cardsPerPage={cardsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
         />}
         {globalVideogames.length && <footer className={style.footerDiv}>
            <p className={style.reachMeAt}>Reach me at</p>
            <div className={style.footerSocialMediaDiv}>
               <Link to={"https://www.linkedin.com/in/nicolasfont1/"} target="_blank">
                  <button className={style.footerSocialMediaButton}>
                     <img style={{ transform: 'translateY(1px)' }} width="35" height="35" src="https://img.icons8.com/material/24/linkedin--v1.png" alt="linkedin--v1"/>
                  </button>
               </Link>
               <Link to={"https://github.com/nicolasfont1/"} target="_blank">
                  <button className={style.footerSocialMediaButton}>
                     <img style={{ transform: 'translateY(1px)' }} width="35" height="35" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Font_Awesome_5_brands_github.svg" alt="linkedin--v1"/>
                  </button>
               </Link>
            </div>
            <p style={{fontSize: "small", fontWeight: "lighter", margin: 0, color: "gray", cursor: "default"}}>or also you can send me an email to</p>
            <div className={style.divEmail}>
               <span className={style.meHarte} style={{ fontSize: "small", color: "gray"}}>This project is running thanks to the <a href="https://rawg.io/apidocs" target="_blank" style={{color: "white"}}>RAWG API</a></span>
               <span className={style.meHarte} style={{ color: "gray"}}>nicolasfont15@gmail.com</span>
               <span className={style.meHarte} style={{ fontSize: "small", color: "gray"}}>Page made for the <a href="https://www.soyhenry.com/" target="_blank" style={{color: "white"}}>soyHenry</a> bootcamp</span>
            </div>
         </footer>}
      </main>
   )
}

export default HomePage;