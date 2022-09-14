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

    const scrollDarken = ScrollDarken()

    return context.user ? (
        <main className={scrollDarken}> 
            <div className="noHero"></div>
            <div className="container">
                <h1>Favorites</h1>

            </div>
        </main>
    ) : <PopUp />

}   


