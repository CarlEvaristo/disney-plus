import React from "react"
import {useParams} from "react-router-dom"
import { ThemeContext } from "../context"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"

export default function Detail() {
    const context = React.useContext(ThemeContext)
    const {id} = useParams()   //render details based on movie id 
    
    const [idParam, setIdParam] = React.useState("")

    React.useEffect(()=>{
        context.toggleChannel(null)
        ScrollTop()
        setIdParam(id)
    },[])

    console.log(context.movies)
    const film = (context.movies.filter(film => film.imdbID === idParam ))[0]

    return context.user ? (
        <main> 
            <div className="noHero"></div>
            <div className="detailContainer" >
                <div className="detailPoster">
                    <img src={`${film.poster}`} style={{width: "100%"}}/>
                </div>

                <div className="detailTxt">
                    <h1>{film.title}</h1>
                    <p>{film.description}</p>
                </div>
            </div>
        </main>
    ) : <PopUp />
}




