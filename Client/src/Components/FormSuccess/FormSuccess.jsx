import style from "./FormSuccess.module.css";
import sonicSuccess from "../../Resources/sonicSuccess.gif"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom"

const FormSuccess = () => {
   const lastGameCreatedUUID = useSelector((state) => state.lastGameCreatedUUID)

   return(
      <div className={style.successContainer}>
         <h1 className={style.titleH1}>Your game was uploaded <span style={{color: "green"}}>succefully</span></h1>
         <img src={sonicSuccess} className={style.sonicImage} />
         <h5>Now you can go to the homepage or check the complete detail of your added game.</h5>
         <div className={style.buttonsDiv}>
            <Link to={"/home"}>
               <button className={style.redirectButtons}>Home</button>
            </Link>
            <Link to={`/detail/${lastGameCreatedUUID}`}>
               <button className={style.redirectButtons}>Detail</button>
            </Link>
         </div>
      </div>
   )
};

export default FormSuccess;