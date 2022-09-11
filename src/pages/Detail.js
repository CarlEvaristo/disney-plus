import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import ScrollDarken from "../components/ScrollDarken"
import { useParams } from "react-router-dom"
import ScrollTop from "../components/ScrollTop"

export default function Brand() {


    const context = React.useContext(ThemeContext)
    const scrollDarken = ScrollDarken()

    React.useEffect(()=>{
        context.toggleChannel(null)
        ScrollTop()
    },[])

    const {id} = useParams()

    const film = (context.movies.filter(film => film.imdbID === id ))[0]
    
    return(
        <main className={scrollDarken}> 
            <div className="detailContainer">
            <h1>{film.Title}</h1>
            </div>
        </main>
    )
}   


