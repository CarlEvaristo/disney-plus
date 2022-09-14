import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import ScrollDarken from "../hooks/useScrollDarken"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"


export default function Brand() {
    const context = React.useContext(ThemeContext)

    React.useEffect(()=>{
        context.toggleChannel(null)
        ScrollTop()
    },[])

    const films = context.allFetched ? context.movies : []  //important short circuiting in case the data is not yet here
    const filmsElements = films.map(film => <FilmImage film={film} key={film.imdbID} /> )
    
    const scrollDarken = ScrollDarken()

    return context.user ? (
        <main className={scrollDarken}> 
            <div className="noHero"></div>
            <div className="container">
                <h1>Films</h1>
                <div className="filmsContainer">
                    {filmsElements}
                </div>
            </div>
        </main>
    ) : <PopUp />

}   


