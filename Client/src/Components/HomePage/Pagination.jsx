import style from "./Pagination.module.css";

const Pagination = ({totalCards, cardsPerPage, setCurrentPage, currentPage}) => {
   let pages = [];

   for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
      pages.push(i)
   }

   return (
      <div className={style.paginationDiv}>
         <button
            onClick={currentPage !== 1 ? () => setCurrentPage(currentPage-1) : ""}
            style={{fontSize: "20px"}}
         >🠘</button>
         {pages.map((page, index) => {
            return <button
                     key={index}
                     onClick={() => setCurrentPage(page)}
                     className={page == currentPage ? style.activePage : ""}>{page}</button>
         })}
         <button
            onClick={currentPage !== Math.ceil(totalCards / cardsPerPage) ? () => setCurrentPage(currentPage+1) : ""}
            style={{fontSize: "20px"}}
         >🠚</button>
      </div>
   )
};

export default Pagination;