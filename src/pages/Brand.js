import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import ScrollDarken from "../components/ScrollDarken"
import { Link, useParams } from "react-router-dom"
import ScrollTop from "../components/ScrollTop"

export default function Brand() {


    let { brand } = useParams()	
    brand = brand.slice(1)
    const context = React.useContext(ThemeContext)

    React.useEffect(()=>{
        context.toggleChannel(brand)
        ScrollTop()
    },[])

    const films = context.movies
    const filmsElements = films.map(film => {
        if (film.channel === brand) {
            return (<div className="filmBox" key={film.imdbID}>
                        <Link to={`/films/${film.imdbID}`}>
                            <img src={film.Poster} alt={film.Title} />
                        </Link>
                    </div>)
        } else { return }
    })
    
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


