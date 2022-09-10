import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import { useParams } from "react-router-dom"

export default function Brand() {
    let {brand} = useParams()	
    brand = brand.slice(1)
    const context = React.useContext(ThemeContext)

    React.useEffect(()=>{
        context.toggleChannel(brand)
    },[])

    const darken =  (context.scrolled < 100) ? "overlayLight" :
    (context.scrolled < 300) ? "overlayMedium" : 
    (context.scrolled < 500) ? "overlayDarker" :
    "overlayDarkest"

    const films = context.movies[brand]
    const filmsElements = films.map(film => {
        return (
            <FilmImage film={film} key={film.imdbID}/>
    )})

    return(
        <main className={`${darken}`}> 
            <div className="heroEmpty"></div>
            <div className="container">
                <div className="filmsContainer">
                    {filmsElements}
                </div>
            </div>
        </main>
    )
}   


