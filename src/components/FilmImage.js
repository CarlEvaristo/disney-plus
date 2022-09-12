import React from "react"
import { Link } from "react-router-dom"

export default function FilmImage({film}){
    return (
        <div className="filmBox" >
            <Link to={`/films/${film.imdbID}`}>
                <img src={film.Poster} alt={film.Title} />

            </Link>
        </div>
    )
}



