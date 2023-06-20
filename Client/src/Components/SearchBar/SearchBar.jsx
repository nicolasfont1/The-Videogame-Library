import style from "./SearchBar.module.css";
import Filter from "../../Resources/Filter.png"
import { useEffect, useState } from "react";
import { searchByName, pageIsLoading, orderCards, filterAddedBy, filterByGenres } from "../../Redux/actions"
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
   const [gameName, setGameName] = useState("");
   const [actualOrder, setActualOrder] = useState("default")
   const [actualAddedFilter, setActualAddedFilter] = useState("")
   const [genreFilters, setGenreFilters] = useState([]);
   const allApiGenres = useSelector((state) => state.allApiGenres)
   const currentFiltersGS = useSelector((state) => state.currentFilters)
   const dispatch = useDispatch();

   const [isOpen, setIsOpen] = useState(false);
   const toggleFilters = () => { setIsOpen(!isOpen) }

   const handleSearchbar = (event) => {
      setGameName(event.target.value)
   }

   const handleKeypress = (event) => {
      if (event.keyCode === 13) {
         dispatch(searchByName(gameName))
         setGameName("")
      }
   };

   const handleOrder = (event) => { //(A-Z = "asc")(Z-A = "des") (Max-min = "max")(Min-max = "min")
      let selectedOrder = event.target.value
      dispatch(orderCards((selectedOrder)))
      if(selectedOrder === "asc"){setActualOrder("A-Z")}
      else if(selectedOrder === "des"){setActualOrder("Z-A")}
      else if(selectedOrder === "max"){setActualOrder("top rated")}
      else if(selectedOrder === "min"){setActualOrder("less rated")}
      else{setActualOrder("default")}
   };

   const handleFilter = (event) => { //(API = "API")(User = "user")(GenderName)
      let addedFilter = event.target.value;
      console.log(addedFilter)
      if(addedFilter === "API" || addedFilter === "user" || addedFilter === "any"){
         if(addedFilter === "API"){setActualAddedFilter("added by API")}
         else if(addedFilter === "user"){setActualAddedFilter("added by user")}
         else {setActualAddedFilter("")}
         dispatch(filterAddedBy(addedFilter)) // ACA!!
         return dispatch(filterByGenres(currentFiltersGS.genres))
      }
      if(!genreFilters.includes(addedFilter)){
         setGenreFilters([...genreFilters, addedFilter])
      }
   };

   const onCloseGenres = (event) => {
      setGenreFilters([...genreFilters.filter((genre) => genre !== event.target.value)])
   };

   useEffect(() => {
      dispatch(filterAddedBy(currentFiltersGS.addedBy)) // ACA!!
      dispatch(filterByGenres(genreFilters))
   }, [genreFilters])

   return (
      <div className={style.searchDiv}>
         <div className={style.actualFiltersDiv}>
            <label className={style.actualOrderLabel}>
               Actual order:
               <span className={style.filterOrderSpan}>{actualOrder}</span>
               {actualOrder !== "default" && <button className={style.closeButton} onClick={handleOrder} value="none">✖</button>}
            </label>
            <label className={style.FilteredLabel}>
               Filtered by:
               <span className={style.filterOrderSpan}>{actualAddedFilter}</span>
               {actualAddedFilter !== "" && <button className={style.closeButton} onClick={handleFilter} value="any">✖</button>}
            </label>
            {genreFilters.map((genre, index) => {
               return(
                  <span id={index}>
                     <span className={style.filterOrderSpan}>{genre}</span>
                     <button className={style.closeButton} onClick={onCloseGenres} value={genre}>✖</button>
                  </span>
               )
            })}
         </div>
         <input
            className={style.barraSearch}
            placeholder="Search a game..."
            type="text"
            onChange={handleSearchbar}
            value={gameName}
            autoComplete="off"
            onKeyUp={handleKeypress}
         />
         <button
            className={style.botonSearch}
            onClick={() => { dispatch(pageIsLoading(true)); dispatch(searchByName(gameName)); setGameName("") }}
         >🔍︎</button>
         <div className={style.filterDiv} onMouseEnter={toggleFilters}>
            <img src={Filter} className={style.filterImage} />
            {isOpen &&
               <div className={style.filterMenuDiv} onMouseLeave={toggleFilters}>
                  <img src={Filter} className={style.filterImage} style={{ left: "20px" }}/>
                  <h4 style={{ margin: "0px" }}>Order by</h4>
                  <label>
                     Alphabetical:
                     <select style={{ marginLeft: "15px" }} name="alphabeticalOrder" defaultValue="Choose" onChange={handleOrder}>
                        <option value="Choose" disabled>show</option>
                        <option value="asc">A-Z</option>
                        <option value="des">Z-A</option>
                     </select>
                  </label>
                  <label>
                     Rating:
                     <select style={{ marginLeft: "15px" }} name="ratingOrder" defaultValue="Choose" onChange={handleOrder}>
                        <option value="Choose" disabled>show</option>
                        <option value="max">Max-min</option>
                        <option value="min">Min-max</option>
                     </select>
                  </label>

                  <h4 style={{ margin: "0px" }}>Filter by</h4>
                  <label>
                     Genre:
                     <select style={{ marginLeft: "15px" }} name="genreFilter" defaultValue="Choose" onChange={handleFilter}>
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
                     <select style={{ marginLeft: "15px" }} name="addedBy" defaultValue="Choose" onChange={handleFilter}>
                        <option value="Choose" disabled>show</option>
                        <option value="any">Any</option>
                        <option value="API">API</option>
                        <option value="user">User</option>
                     </select>
                  </label>
               </div>}
         </div>
      </div>
   )
};

export default SearchBar;