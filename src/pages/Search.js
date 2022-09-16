import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import ScrollDarken from "../hooks/useScrollDarken"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"
import { arrayRemove } from "firebase/firestore"


export default function Search() {
    const context = React.useContext(ThemeContext)
    const [input, setInput] = React.useState("")

    React.useEffect(()=>{
        context.toggleChannel(null)
        ScrollTop()
    },[])

    const scrollDarken = ScrollDarken()

    function changeHandler(event) {
        setInput(event.target.value)
    }
    function clickHandler(event){
       if (event.keyCode === 13) {
        console.log(input)
       }
    }

    const films = context.movies || []  //important short circuiting in case the data is not yet here
    const searchresults = films.filter(film =>   (input.toLowerCase()).split(" ").some(item => (film.title.toLowerCase()).includes(item)) ) 
    
    const filmsElements = searchresults.map(film => <FilmImage film={film} key={film.imdbID} /> )

    return context.user ? (
        <main className={scrollDarken}> 
            <div className="noHero"></div>
            <input className="searchBar" type="text" onChange={changeHandler} onKeyDown={clickHandler} placeholder="Search a movie..." required></input>
            <div className="container">
                <div className="filmsContainer">
                    {filmsElements}
                </div>
            </div>
        </main>
    ) : <PopUp />

}   


