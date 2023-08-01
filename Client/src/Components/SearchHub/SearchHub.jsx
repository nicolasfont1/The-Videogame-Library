import style from "./SearchHub.module.css";
import Filter from "../../Resources/Filter.png"
import validateSearch from "./validateSearch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByName, orderCards, filterAddedBy, filterByGenres, cleanGlobalVideogames, setShowingSearch, pageIsLoading } from "../../Redux/actions"

const SearchBar = () => {
   const [gameName, setGameName] = useState("");
   
   const [menuIsOpen, setmenuIsOpen] = useState(false); // Este state y la funcion de abajo son usadas para el menú de filtros.
   const toggleMenu = () => { setmenuIsOpen(!menuIsOpen) }
   
   const [actualOrder, setActualOrder] = useState("default"); // State que cambia el span del orden actual que tienen las Cards.
   const [actualAddedBy, setActualAddedBy] = useState(""); // State que cambia el span de los filtros aplicados en el momento.
   const [genreFilters, setGenreFilters] = useState([]); // State que guarda los generos seleccionados para filtrar.
   
   const pageLoading = useSelector((state) => state.pageLoading);
   const allApiGenres = useSelector((state) => state.allApiGenres)
   const showingSearch = useSelector((state) => state.showingSearch); // State que esconde o muestra el boton para borrar la búsqueda.
   const currentFiltersGlobalState = useSelector((state) => state.currentFilters)
   // El global state currentFilters guarda los filtros aplicados hasta el momento. Cuando vaya a agregar/quitar un filtro,
   // antes despacho el valor que corresponda (el filtro contrario) para no perder el filtro anterior.

   const dispatch = useDispatch();

   const handleSearchbar = (event) => { // Función aplicada al onChange de la Search Bar.
      setGameName(event.target.value)
   }
   
   const handleKeypress = (event) => { // Función que permite realizar la búsqueda al presionar enter.
      if (event.keyCode === 13) {
         doValidSearch(gameName)
      }
   };

   const doValidSearch = (gameName) => { // doValidSearch recibe el nombre que se escribió en la search bar y evaúa si es válido.
      let validName = validateSearch(gameName)
      if(!validName) return setGameName("")
      dispatch(searchByName(validName))
      dispatch(setShowingSearch(true))
   }

   const handleOrder = (event) => { // Esta funcion recibe y despacha el orden que quiero en las cards.
      let selectedOrder = event.target.value
      dispatch(orderCards((selectedOrder)))
      // Luego del dispatch, setea el span que muestra el orden actual de las cards. 
      if(selectedOrder === "asc"){setActualOrder("A-Z")}
      else if(selectedOrder === "des"){setActualOrder("Z-A")}
      else if(selectedOrder === "max"){setActualOrder("top rated")}
      else if(selectedOrder === "min"){setActualOrder("less rated")}
      else{setActualOrder("default")}
   };

   const handleFilter = (event) => { // Esta función maneja los dos select que permiten filtrar las cards.
      let addedFilter = event.target.value;
      if(addedFilter === "API" || addedFilter === "user" || addedFilter === "any"){ // If para manejar el filtro "Added by".
         if(addedFilter === "API"){setActualAddedBy("added by API")}
         else if(addedFilter === "user"){setActualAddedBy("added by user")}
         else {setActualAddedBy("")}

         dispatch(filterAddedBy(addedFilter)) // ! // Agrego el filtro seleccionado.
         return dispatch(filterByGenres(currentFiltersGlobalState.genres)) // Uso el global state para no perder el filtro anterior.
      }
      if(!genreFilters.includes(addedFilter)){ // Agregar géneros al state que contiene los seleccionados para filtrar. No repetidos.
         setGenreFilters([...genreFilters, addedFilter])
      }
   };
   
   const onCloseGenres = (event) => {
      setGenreFilters([...genreFilters.filter((genre) => genre !== event.target.value)]) // Elimino el genero correspondiente.
   };

   useEffect(() => { // useEffect que depende del local state genreFilters. Cada vez que agrego o elimino un género, despacho.
      dispatch(filterAddedBy(currentFiltersGlobalState.addedBy)) // ! // Primero aplico el filtro addedBy que estaba puesto.
      dispatch(filterByGenres(genreFilters)) // Luego envio el array actualizado para realizar el filtrado en el reducer.
   }, [genreFilters])

   return (
      <div className={style.searchHubDiv}>
         {!pageLoading && <div className={style.actualFiltersDiv}>
            <label className={style.actualOrderLabel}>
               Actual order:

               <span className={style.filterOrderSpan}>{actualOrder}</span>
               {actualOrder !== "default" && <button className={style.closeButton} onClick={handleOrder} value="none">✖</button>}

            </label>

            <label className={style.FilteredLabel}>
               Filtered by:

               <span className={style.filterOrderSpan}>{actualAddedBy}</span>
               {actualAddedBy !== "" && <button className={style.closeButton} onClick={handleFilter} value="any">✖</button>}

            </label>

            {genreFilters.map((genre, index) => {
               return(
                  <span id={index}>
                     <span className={style.filterOrderSpan}>{genre}</span>
                     <button className={style.closeButton} onClick={onCloseGenres} value={genre}>✖</button>
                  </span>
               )
            })}
         </div>}

         {showingSearch && <button 
               className={style.cleanSearchButton}
               onClick={() => {
                  dispatch(cleanGlobalVideogames()),
                  dispatch(setShowingSearch(false)),
                  dispatch(pageIsLoading(true)),
                  setGameName("")
               }}
         >✖</button>}

         {!pageLoading && <input
            className={style.barraSearch}
            placeholder="Search a game..."
            type="text"
            onChange={handleSearchbar}
            value={gameName}
            autoComplete="off"
            onKeyUp={handleKeypress}
         />}

         {!pageLoading && <button
            className={style.botonSearch}
            onClick={() => { doValidSearch(gameName) }}
         >🔍︎</button>}

         {!pageLoading && <div className={style.filterDiv} onMouseEnter={toggleMenu}>
            <img src={Filter} className={style.filterImage} />
            {menuIsOpen &&
               <div className={style.filterMenuDiv} onMouseLeave={toggleMenu}>
                  <img src={Filter} className={style.filterImage} style={{ left: "20px" }}/>
                  
                  <section className={style.filterMenuOption}>
                     <h4 style={{ margin: "0px" }}>Order by</h4>
                     <div className={style.divFilterContainer}>
                        <label>
                           Alphabetical:
                        
                           <select className={style.selectFilter} style={{ marginLeft: "15px" }} name="alphabeticalOrder" defaultValue="Choose" onChange={handleOrder}>
                              <option value="Choose" disabled>show</option>
                              <option value="asc">A-Z</option>
                              <option value="des">Z-A</option>
                           </select>
                        </label>
                        <label>
                           Rating:
                           <select className={style.selectFilter} style={{ marginLeft: "15px" }} name="ratingOrder" defaultValue="Choose" onChange={handleOrder}>
                              <option value="Choose" disabled>show</option>
                              <option value="max">Max-min</option>
                              <option value="min">Min-max</option>
                           </select>
                        </label>
                     </div>
                  </section>

                  <div className={style.filterMenuOption}>
                     <h4 style={{ margin: "0px" }}>Filter by</h4>
                     <div className={style.divFilterContainer}>
                        <label>
                           Genre:
                           <select className={style.selectFilter} style={{ marginLeft: "15px" }} name="genreFilter" defaultValue="Choose" onChange={handleFilter}>
                              <option value="Choose" disabled>show</option>
                              {allApiGenres.map((genre, index) => {
                                 return (
                                    <option key={index} value={genre.name}>{genre.name}</option>
                                 )
                              })}
                           </select>
                        </label>
                        <label>
                           Added by:
                           <select className={style.selectFilter} style={{ marginLeft: "15px" }} name="addedBy" defaultValue="Choose" onChange={handleFilter}>
                              <option value="Choose" disabled>show</option>
                              <option value="any">Any</option>
                              <option value="API">API</option>
                              <option value="user">User</option>
                           </select>
                        </label>
                     </div>
                  </div>
                  
               </div>}
         </div>}
      </div>
   )
};

export default SearchBar;