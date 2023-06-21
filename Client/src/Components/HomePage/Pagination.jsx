import style from "./Pagination.module.css";

// totalCards es el length de globalVideogames, no debe ser fijo ya que durante el filtrado o la búsqueda este estado cambia.
const Pagination = ({totalCards, cardsPerPage, setCurrentPage, currentPage}) => {
   let pages = [];

   // Divido el total de cards entre las que voy a mostrar por página, redondeo hacia arriba para que ninguna card quede afuera.
   for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
      pages.push(i)
   }

   return (
      <div className={style.paginationDiv}>
         <button
            onClick={currentPage !== 1 ? () => setCurrentPage(currentPage-1) : console.log()}
            style={{fontSize: "20px"}}
         >🠘</button>
         {pages.map((page, index) => {
            return <button
                     key={index}
                     onClick={() => setCurrentPage(page)}
                     className={page == currentPage ? style.activePage : ""}>{page}</button>
         })}
         <button
            onClick={currentPage !== Math.ceil(totalCards / cardsPerPage) ? () => setCurrentPage(currentPage+1) : console.log()}
            style={{fontSize: "20px"}}
         >🠚</button>
      </div>
   )
};

export default Pagination;