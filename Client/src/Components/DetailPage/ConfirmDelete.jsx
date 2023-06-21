import { useNavigate } from "react-router-dom";
import { cleanGlobalVideogames, pageIsLoading } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import style from "./ConfirmDelete.module.css";
import axios from "axios";


const ConfirmDelete = ({gameName, setShowConfirmDelete, id}) => {
   const navigate = useNavigate();
   const dispatch = useDispatch()

   const deleteVideogame = async (id) => {
      try {
         dispatch(cleanGlobalVideogames())
         dispatch(pageIsLoading(true))
         const backendMessage = await axios.delete(`http://localhost:3001/videogames/${id}`)
         navigate("/home")
         return window.alert(backendMessage.data)
      } catch (error) {
         return window.alert(error.message)
      }
   };

   return(
      <div className={style.confirmContainer}>
         <h3>Are you sure?</h3>
         <h4>The <span style={{color: "darkred"}}>delete</span> action is irreversible,</h4>
         <h4>{gameName} will disappear forever.</h4>
         <button onClick={() => setShowConfirmDelete(false)} style={{marginRight: "40px", cursor: "pointer"}}>Cancel</button>
         <button onClick={() => deleteVideogame(id)} style={{marginLeft: "40px", cursor: "pointer"}}>Delete</button>
      </div>
   )
};

export default ConfirmDelete;