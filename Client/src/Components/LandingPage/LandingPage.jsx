import style from "./LandingPage.module.css"
import LandingKeyhole from "../../Resources/LandingKeyhole.png"
import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <div className={style.pageHolder}>
            <div className={style.titleDiv}>
                <h4>THE</h4>
                <h1>VIDEOGAME</h1>
                <h2>LIBRARY</h2>
            </div>
            <div className={style.keyholeDiv}>
                <Link to="/home" className={style.link}>
                    <img className={style.keyholeImage} src={LandingKeyhole} />
                </Link>
            </div>
        </div>
    )
};

export default LandingPage

// Quiero hacer que el enter button sea una cerradura y el puntero una llave.