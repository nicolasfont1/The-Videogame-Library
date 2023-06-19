import style from "./SearchBar.module.css";
import Filter from "../../Resources/Filter.png"
import { useState } from "react";
import { searchByName, pageIsLoading, orderCards, filterCards } from "../../Redux/actions"
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
   const [gameName, setGameName] = useState("");
   const [actualOrder, setActualOrder] = useState("default")
   const [cardFilters, setCardFilters] = useState([]);
   const allApiGenres = useSelector((state) => state.allApiGenres)
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
      dispatch(orderCards((event.target.value)))
      if(event.target.value === "asc"){setActualOrder("A-Z")}
      else if(event.target.value === "des"){setActualOrder("Z-A")}
      else if(event.target.value === "max"){setActualOrder("top rated")}
      else if(event.target.value === "min"){setActualOrder("less rated")}
      else{setActualOrder("default")}
   };

   const handleFilter = (event) => { //(API = "API")(User = "user")(GenderName)
      let addedFilter = event.target.value;
      if(addedFilter === "API" || addedFilter === "user"){
         return dispatch(filterCards(addedFilter))
      }
      if(!cardFilters.includes(addedFilter)){
         setCardFilters([...cardFilters, addedFilter])
      }
   };


   return (
      <div className={style.searchDiv}>
         <div className={style.actualFiltersDiv}>
            <label className={style.actualOrderLabel}>
               Actual order:
               <span className={style.filterOrderSpan}>{actualOrder}</span>
               {actualOrder !== "default" && <button className={style.closeButton} onClick={handleOrder} value="def">✖</button>}
            </label>
            <label className={style.FilteredLabel}>
               Filtered by:
               <span className={style.filterOrderSpan}>Messi</span>
            </label>
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
         <div className={style.filterDiv}>
            <img src={Filter} className={style.filterImage} onMouseEnter={toggleFilters} />
            {isOpen &&
               <div className={style.filterMenuDiv} onMouseLeave={toggleFilters}>
                  <img src={Filter} className={style.filterImage} onClick={toggleFilters} style={{ left: "20px" }}/>
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