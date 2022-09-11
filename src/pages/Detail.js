import React from "react"
import {useParams} from "react-router-dom"
import { ThemeContext } from "../context"
import ScrollTop from "../components/ScrollTop"

export default function Detail() {
    const context = React.useContext(ThemeContext)
    const {id} = useParams()   //render details based on movie id 
    
    const [idParam, setIdParam] = React.useState("")

    React.useEffect(()=>{
        context.toggleChannel(null)
        ScrollTop()
        setIdParam(id)
    },[])

    console.log(context.movies[0])

    const film = context.movies[0] !== undefined && (context.movies.filter(film => film.imdbID === idParam ))[0]

    return (
        <h1>{film.imdbID}</h1>
    )
}


// import React from "react"
// import { ThemeContext } from "../context"
// import FilmImage from "../components/FilmImage"
// import ScrollDarken from "../components/ScrollDarken"
// import { useParams } from "react-router-dom"
// import ScrollTop from "../components/ScrollTop"

// export default function Brand() {
//     const [idParam, setIdParam] = React.useState("")

//     const context = React.useContext(ThemeContext)
//     const scrollDarken = ScrollDarken()
//     const {id} = useParams()

//     React.useEffect(()=>{
//         context.toggleChannel(null)
//         ScrollTop()
//     },[])
    
//     const film = (context.movies.filter(film => film.imdbID === id ))[0]
    
//     return(
//         <main className={scrollDarken}> 
//             <div className="detailContainer">
//             <h1>{film.Title}</h1>
//             </div>
//         </main>
//     )
// }   


