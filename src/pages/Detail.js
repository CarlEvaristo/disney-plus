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


    const film = context.allFetched && (context.movies.filter(film => film.imdbID === idParam ))[0] || {}
    console.log(film)

    return context.user ? (
        <main> 
            <div className="noHero"></div>
            <div className="container">
                <h1>{film.Title}</h1>
            </div>
        </main>
    ) : <PopUp />
}




