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
    console.log(film.Poster)

    return context.user ? (
        <main> 
            <div className="noHero"></div>
            <div className="detailContainer" >
                <div className="detailPoster">
                    <img src={`${film.Poster}`} style={{width: "100%"}}/>
                </div>

                <div className="detailTxt">
                    <h1>{film.Title}</h1>
                    <p>Coco is a 2017 American computer-animated fantasy film produced by Pixar Animation Studios and released by Walt Disney Pictures. Based on an original idea by Lee Unkrich, it is directed by him and co-directed by Adrian Molina. The film's voice cast stars Anthony Gonzalez, Gael García Bernal, Benjamin Bratt, Alanna Ubach, Renée Victor, Ana Ofelia Murguía and Edward James Olmos. The story follows a 12-year-old boy named Miguel who is accidentally transported to the Land of the Dead, where he seeks the help of his deceased musician great-great-grandfather to return him to his family among the living and to reverse his family's ban on music.
                    The concept for Coco is inspired by the Mexican holiday Day of the Dead. The film was scripted by Molina and Matthew Aldrich from a story by Unkrich, Jason Katz, Aldrich, and Molina. Pixar began developing the animation in 2016; Unkrich and some of the film's crew visited Mexico for research. Composer Michael Giacchino, who had worked on prior Pixar animated features, composed the score. With a cost of $175–225 million, Coco is the first film with a nine-figure budget to feature an all-Latino principal cast.
                    </p>
                </div>
            </div>
        </main>
    ) : <PopUp />
}




