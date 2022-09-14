import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import ScrollDarken from "../hooks/useScrollDarken"
import { useParams } from "react-router-dom"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"


export default function Brand() {
    
    let { brand } = useParams()	
    brand = brand.slice(1)
    const context = React.useContext(ThemeContext)

    React.useEffect(()=>{
        context.toggleChannel(brand)
        ScrollTop()
    },[])

    const films = context.movies ? context.movies : []  //important short circuiting in case the data is not yet here
    const filmsElements = films.map(film => {
        if (film.channel === brand) {
            return <FilmImage film={film} key={film.imdbID} />
        } 
    })
    
    const scrollDarken = ScrollDarken()

    return context.user ? (
        <main className={scrollDarken}> 
            <div className="heroEmpty"></div>
            <div className="container">
                <div className="filmsContainer">
                    {filmsElements}
                </div>
            </div>
        </main>
    ) : <PopUp />

}   


