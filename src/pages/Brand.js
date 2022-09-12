import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import ScrollDarken from "../hooks/useScrollDarken"
import { Link, useParams } from "react-router-dom"
import ScrollTop from "../hooks/useScrollTop"

export default function Brand() {

    let { brand } = useParams()	
    brand = brand.slice(1)
    const context = React.useContext(ThemeContext)
    console.log(brand)

    React.useEffect(()=>{
        context.toggleChannel(brand)
        ScrollTop()
    },[])

    const films = context.allFetched ? context.movies : []  //important short circuiting in case the data is not yet here
    console.log(context.allFetched, context.movies)
    const filmsElements = films.map(film => {
        if (film.channel === brand) {
            return <FilmImage film={film} key={film.imdbID} />
        } 
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


