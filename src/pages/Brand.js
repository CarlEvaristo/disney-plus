import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import ScrollDarken from "../components/ScrollDarken"
import { useParams } from "react-router-dom"

export default function Brand() {
    let {brand} = useParams()	
    brand = brand.slice(1)
    const context = React.useContext(ThemeContext)

    React.useEffect(()=>{
        context.toggleChannel(brand)
    },[])

    const films = context.movies[brand]
    const filmsElements = films.map(film => {
        return (
            <FilmImage film={film} key={film.imdbID}/>
    )})
    
    const scrollDarken = ScrollDarken()

    return(
        <main className={scrollDarken}> 
            <div className="heroEmpty"></div>
            <div className="container">
                <div className="filmsContainer">
                    {filmsElements}
                </div>
            </div>
        </main>
    )
}   


